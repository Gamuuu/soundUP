'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabaseAuth } from '../lib/supabaseAuth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for user session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // 1. Check Supabase Session (OAuth/Magic Link)
        const { data: { session } } = await supabaseAuth.auth.getSession();
        
        if (session?.user) {
          setUser({
            ...session.user,
            provider: 'supabase'
          });
        } else {
          // 2. Check LocalStorage (Custom Manual Login)
          const localUser = localStorage.getItem('user');
          if (localUser) {
            setUser(JSON.parse(localUser));
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for Supabase auth changes
    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ ...session.user, provider: 'supabase' });
      } else {
        // If supabase logout, check local storage (or clear it if intentional logout)
        const localUser = localStorage.getItem('user');
        if (localUser) {
            setUser(JSON.parse(localUser));
        } else {
            setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    // Clear Supabase Session
    await supabaseAuth.auth.signOut();
    // Clear LocalStorage
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
