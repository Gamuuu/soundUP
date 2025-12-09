import './globals.css';

export const metadata = {
  title: 'SounduUP',
  description: 'SounduUP Application',
};

import { Monoton } from 'next/font/google';

const monoton = Monoton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-monoton',
});

import Navbar from '../components/layout/Navbar';
import FooterWrapper from '../components/layout/FooterWrapper';

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/cart/CartDrawer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${monoton.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            {children}
            <FooterWrapper />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
