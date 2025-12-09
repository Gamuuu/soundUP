# Global Architecture Documentation

This document details the high-level architecture, layout, and global state management of the SoundUp application.

## 1. Root Layout (`src/app/layout.js`)

The root layout is the shell of the application. It wraps every page route and persists throughout the user session.

### UI Structure
- **Navbar**: Fixed at the top (z-index high). Contains links to Home, Products, Service, etc., and the Cart/Profile icons.
- **Children**: The dynamic content of the page being rendered.
- **Footer**: Fixed or relative at the bottom.

### Logic & Providers
The layout acts as the **Global State Provider**. It wraps the application in the following context providers:
1.  **`AuthProvider`**: Makes user session data available to any component.
2.  **`CartProvider`**: Makes shopping cart state and actions available globally.

---

## 2. Authentication Context (`src/context/AuthContext.js`)

The `AuthContext` is the central hub for user identity. It uses a **Hybrid Strategy** to support both custom backend users and Supabase OAuth users.

### State
- **`user`**: An object containing `{ name, email, role, id, ... }` or `null`.
- **`loading`**: Boolean indicating if the session check is in progress.

### Logic
1.  **Initialization (`useEffect`)**:
    -   First, checks **Supabase Auth** (`supabase.auth.getSession()`) for an active session (Google Login).
    -   If no Supabase session, checks **LocalStorage** (`localStorage.getItem('user')`) for a custom login session.
2.  **`login(userData)`**:
    -   Updates the `user` state.
    -   Persists the user object to `localStorage`.
3.  **`logout()`**:
    -   Calls `supabase.auth.signOut()` to clear OAuth sessions.
    -   Removes `'user'` from `localStorage`.
    -   Sets `user` state to `null`.

---

## 3. Cart Context (`src/context/CartContext.js`)

The `CartContext` manages the e-commerce shopping cart. It is a **Client-Side Only** store, meaning data is saved in the browser, not the database.

### State
-   **`cartItems`**: Array of product objects. Each object has an added `quantity` property.
-   **`isCartOpen`**: Boolean to toggle the side drawer UI.

### Logic
1.  **Persistence**:
    -   **Load**: On mount, parses `localStorage.getItem('cart')`.
    -   **Save**: `useEffect` listens for changes in `cartItems` and writes to `localStorage`.
2.  **`addToCart(product)`**:
    -   Checks if the product ID already exists in the array.
    -   **If yes**: Increments the `quantity` of the existing item.
    -   **If no**: Pushes the new product with `quantity: 1`.
    -   **Trigger**: Automatically sets `isCartOpen(true)` to show feedback.
3.  **`updateQuantity(id, newQuantity)`**:
    -   If `newQuantity < 1`, it triggers `removeFromCart`.
    -   Otherwise, maps through items and updates the target.
4.  **Derived Values**:
    -   **`cartCount`**: Sum of all item quantities (displayed in Navbar badge).
    -   **`cartTotal`**: Sum of (Price * Quantity) for all items.
