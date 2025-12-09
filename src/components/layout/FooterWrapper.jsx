'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const FooterWrapper = () => {
    const pathname = usePathname();

    // Hide footer on contact page (custom design), home page (scroll snap), and about us (internal scroll)
    if (pathname === '/contact' || pathname === '/' || pathname === '/about-us' || pathname === '/login' || pathname === '/register' || pathname === '/products') {
        return null;
    }

    return <Footer />;
};

export default FooterWrapper;
