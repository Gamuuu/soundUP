'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabaseAuth } from '../lib/supabaseAuth';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user || null;
      const previousUser = user;
      setUser(newUser);

      // If user just logged in, merge guest cart
      if (newUser && !previousUser) {
        mergeGuestCartOnLogin(newUser.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load cart on mount or user change
  useEffect(() => {
    if (isLoading) return;

    if (user) {
      loadCartFromSupabase();
    } else {
      loadCartFromLocalStorage();
    }
  }, [user, isLoading]);

  // Load cart from localStorage (for guests)
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
        setCartItems([]);
      }
    }
  };

  // Load cart from Supabase (for logged-in users)
  const loadCartFromSupabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabaseAuth
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart from Supabase:', error);
        return;
      }

      // Transform Supabase data to cart format
      const items = data.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: parseFloat(item.product_price),
        image: item.product_image,
        category: item.product_category,
        quantity: item.quantity,
      }));

      setCartItems(items);
      // Clear localStorage cart after loading from DB
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to load cart from Supabase:', error);
    }
  };

  // Merge guest cart with Supabase cart on login
  const mergeGuestCartOnLogin = async (userId) => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) {
      loadCartFromSupabase();
      return;
    }

    try {
      const guestItems = JSON.parse(savedCart);

      // Upsert each guest item to Supabase
      for (const item of guestItems) {
        await supabaseAuth
          .from('cart_items')
          .upsert({
            user_id: userId,
            product_id: item.id,
            product_name: item.name,
            product_price: item.price,
            product_image: item.image || item.images?.[0] || null,
            product_category: item.category,
            quantity: item.quantity,
          }, {
            onConflict: 'user_id,product_id',
            ignoreDuplicates: false
          });
      }

      // Clear localStorage and reload from Supabase
      localStorage.removeItem('cart');
      loadCartFromSupabase();
    } catch (error) {
      console.error('Error merging guest cart:', error);
    }
  };

  // Sync single item to Supabase
  const syncItemToSupabase = async (item, action = 'upsert') => {
    if (!user) return;

    try {
      if (action === 'delete') {
        await supabaseAuth
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', item.id);
      } else {
        await supabaseAuth
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: item.id,
            product_name: item.name,
            product_price: item.price,
            product_image: item.image || item.images?.[0] || null,
            product_category: item.category,
            quantity: item.quantity,
          }, {
            onConflict: 'user_id,product_id'
          });
      }
    } catch (error) {
      console.error('Error syncing to Supabase:', error);
    }
  };

  // Save to localStorage (for guests)
  const saveToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        // Sync updated item
        const updatedItem = newItems.find(i => i.id === product.id);
        if (user) {
          syncItemToSupabase(updatedItem);
        } else {
          saveToLocalStorage(newItems);
        }
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0] || null,
          category: product.category,
          quantity: 1
        };
        newItems = [...prevItems, newItem];
        if (user) {
          syncItemToSupabase(newItem);
        } else {
          saveToLocalStorage(newItems);
        }
      }
      return newItems;
    });
    setIsCartOpen(true);
  }, [user]);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      const newItems = prevItems.filter((item) => item.id !== productId);

      if (user && itemToRemove) {
        syncItemToSupabase(itemToRemove, 'delete');
      } else {
        saveToLocalStorage(newItems);
      }

      return newItems;
    });
  }, [user]);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      const updatedItem = newItems.find(i => i.id === productId);
      if (user && updatedItem) {
        syncItemToSupabase(updatedItem);
      } else {
        saveToLocalStorage(newItems);
      }

      return newItems;
    });
  }, [user]);

  const clearCart = useCallback(async () => {
    if (user) {
      try {
        await supabaseAuth
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error clearing cart from Supabase:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
    setCartItems([]);
  }, [user]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
