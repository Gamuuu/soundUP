'use client';

import React from 'react';
// import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Promotion from '../components/home/Promotion';
import Popular from '../components/home/Popular';
import Gallery from '../components/home/Gallery';
import ScrollNavigation from '../components/ui/ScrollNavigation';

import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="h-screen bg-background text-white selection:bg-accent selection:text-white overflow-hidden">
      <ScrollNavigation />
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <Hero />
        <Categories />
        <Promotion />
        <Popular />
        <Gallery />
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </div>
  );
}
