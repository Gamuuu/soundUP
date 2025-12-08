import React, { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'promotion', label: 'Promotion' },
    { id: 'popular', label: 'Popular' },
    { id: 'gallery', label: 'Gallery' },
];

const ScrollNavigation = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const mainContainer = document.querySelector('main');
        if (!mainContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: mainContainer,
                threshold: 0.5,
            }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            // Check if element exists before observing
            if (element) {
                observer.observe(element);
            }
        });

        // Add observer for footer to possibly clear active section or handle it
        // But sections array is fixed. Just observe what we have.

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const mainContainer = document.querySelector('main');

        if (element && mainContainer) {
            const scrollTop = mainContainer.scrollTop;
            const targetOffset = element.offsetTop;

            animate(scrollTop, targetOffset, {
                type: 'spring',
                stiffness: 20,
                damping: 50,
                mass: 20,
                onUpdate: (latest) => {
                    mainContainer.scrollTop = latest;
                },
            });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="group relative flex items-center justify-end"
                    aria-label={`Scroll to ${label}`}
                >
                    <span
                        className={`absolute right-8 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none`}
                    >
                        {label}
                    </span>
                    <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/20 ${activeSection === id ? 'bg-accent scale-125' : 'bg-white/20 hover:bg-white/50'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default ScrollNavigation;
