'use client';

import React, { useEffect, useRef } from 'react';
import { Headphones, Music, Radio } from 'lucide-react';

// Helper to convert hex to rgb
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 85, b: 0 };
};

const NeonCube = ({ size = 200, color = '#FF5500', className = '' }) => {
    const cubeRef = useRef(null);
    const containerRef = useRef(null);

    // Rotation state
    const currentRot = useRef({ x: 0, y: 0 });
    const targetRot = useRef({ x: 0, y: 0 });
    const isTracking = useRef(false); // Track if mouse is present
    const requestRef = useRef(null);

    // Animation constants
    const LERP_FACTOR = 0.08;

    // Animation Loop
    const animate = () => {
        if (!cubeRef.current) return;

        if (!isTracking.current) {
            // Idle Mode: Nodding up and down (Cursor not found)
            const time = Date.now() * 0.003;
            targetRot.current = {
                x: Math.sin(time) * 15, // Nod up/down +/- 15 degrees
                y: 0 // Face forward
            };
        }

        // Smooth interpolation (LERP) for both Tracking and Idle states
        currentRot.current.x += (targetRot.current.x - currentRot.current.x) * LERP_FACTOR;
        currentRot.current.y += (targetRot.current.y - currentRot.current.y) * LERP_FACTOR;

        // Apply transform
        cubeRef.current.style.transform = `rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg)`;

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            isTracking.current = true; // Mouse found
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const { innerWidth, innerHeight } = window;
            const xPct = (e.clientX - centerX) / (innerWidth / 2);
            const yPct = (e.clientY - centerY) / (innerHeight / 2);

            const MAX_ROT = 40;
            targetRot.current = {
                x: -yPct * MAX_ROT,
                y: xPct * MAX_ROT
            };
        };

        const handleMouseLeave = () => {
            isTracking.current = false; // Mouse lost
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave); // Detect leaving window

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Calculate half size for translateZ
    const half = size / 2;
    const rgb = hexToRgb(color);

    // Common face styles - FIXED SIZE for all faces
    const faceStyle = {
        position: 'absolute',
        width: size,
        height: size,
        border: `2px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        boxSizing: 'border-box',
    };

    // Scale factor for the mascot face (based on original design at 200px)
    const scale = size / 200;

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: size,
                height: size,
                perspective: `${size * 10}px`,
                perspectiveOrigin: 'center center',
            }}
        >
            <div
                ref={cubeRef}
                style={{
                    width: size,
                    height: size,
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {/* Front Face - Mascot */}
                <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }}>
                    <div 
                        className="flex flex-col items-center justify-center"
                        style={{ transform: `scale(${scale})` }}
                    >
                        {/* Original hardcoded sizes, scaled down via transform */}
                        <div className="flex gap-6 mb-3">
                            <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_10px_white]" />
                            <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_10px_white]" />
                        </div>
                        <div className="w-12 h-6 border-b-4 border-white rounded-full" />
                    </div>
                </div>

                {/* Back Face */}
                <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }}>
                    <Radio size={size * 0.35} strokeWidth={1.5} />
                </div>

                {/* Right Face */}
                <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }}>
                    <Headphones size={size * 0.35} />
                </div>

                {/* Left Face */}
                <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }}>
                    <Headphones size={size * 0.35} />
                </div>

                {/* Top Face */}
                <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }}>
                    <Music size={size * 0.35} />
                </div>

                {/* Bottom Face */}
                <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }}>
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(to top, rgba(${rgb.r},${rgb.g},${rgb.b},0.2), transparent)` }} />
                </div>
            </div>
        </div>
    );
};

export default NeonCube;
