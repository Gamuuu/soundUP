# Authentication System Documentation

This system handles user registration, login, and profile management. It uses a **hybrid approach** combining custom backend logic with Supabase Auth.

---

## 1. Registration (`src/app/register/page.js`)

### UI Details
-   **Aesthetic**: "Cyberpunk/Neon" theme. Dark background, floating blurred orbs, and a 3D `NeonCube`.
-   **Form**: Standard fields for Name, Email, Password.
-   **Feedback**:
    -   **Loading**: Button text changes to "Creating Account..." and creates a disabled state.
    -   **Error**: Red alert box appears above the form.
    -   **Success**: Javascript `alert()` followed by a redirect to Login.

### Backend Logic (`src/app/api/auth/register/route.js`)
-   **Process**:
    1.  Receives JSON payload.
    2.  Checks Supabase `User` table for existing email.
    3.  **Vulnerability**: Inserts the new user record with the password as **Plain Text**.
    4.  Returns 201 Created on success.

---

## 2. Login (`src/app/login/page.js`)

### UI Details
-   **Visuals**: Consistent with Register page (Dark/Neon).
-   **Input**: Email & Password fields.
-   **Social Login**: A dedicated "Sign in with Google" button using the Google logo.

### Logic
-   **Custom Login**:
    -   Submits to `/api/auth/login`.
    -   **Vulnerability**: Compares the input password directly with the plain text database password.
    -   On success: Saves user to `AuthContext` and `localStorage`.
-   **OAuth Login**:
    -   Calls `supabaseAuth.auth.signInWithOAuth({ provider: 'google' })`.
    -   Redirects user to Google's consent screen.
    -   On return, Supabase handles the session creation.

---

## 3. User Profile (`src/app/profile/page.js`)

### UI Details
-   **Header**: Displays User Name and Email next to a large Avatar (NeonCube).
-   **Badges**:
    -   "Member Account" (or Role).
    -   "No recent orders" status.
-   **Dashboard Grid**: Placeholders for "Order History" and "Account Settings".
-   **Logout**: A prominent red button with a `LogOut` icon.

### Logic
-   **Access Control**:
    -   On mount, checks `supabaseAuth.getSession()` first.
    -   If failed, checks `localStorage.getItem('user')`.
    -   **Redirect**: If both fail, immediately pushes to `/login`.
-   **Logout Action**:
    -   Executes `signOut()` (Supabase).
    -   Clears `localStorage`.
    -   Alerts user and redirects to Login.
