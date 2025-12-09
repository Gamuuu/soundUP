'use client';

import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    Speaker,
    Music2,
    Zap,
    Sliders,
    Radio,
    Layers,
    Hammer,
    Cpu,
    Battery,
    Wrench,
    Sun,
    Camera,
    ShieldCheck
} from 'lucide-react';

export default function Service() {
    const services = [
        {
            title: "Speaker Installation",
            icon: <Speaker className="w-8 h-8 text-white" />,
            items: ["Coaxial & Component Systems", "Custom Door Pods", "6x9 & Oval Speakers", "Factory Replacement"],
            image: "/assets/images/service_speaker.png"
        },
        {
            title: "Subwoofer Setup",
            icon: <Music2 className="w-8 h-8 text-white" />,
            items: ["Sealed & Ported Boxes", "Under-seat Solutions", "Custom Trunk Builds", "High-SPL Setups"],
            image: "/assets/images/service_subwoofer.png"
        },
        {
            title: "Amplifier Installation",
            icon: <Zap className="w-8 h-8 text-white" />,
            items: ["Mono, 2-Channel, 4-Channel", "5-Channel Systems", "Clean Wire Routing", "Gain Matching"],
            image: "/assets/images/service_amplifier.png"
        },
        {
            title: "DSP & Tuning",
            icon: <Sliders className="w-8 h-8 text-white" />,
            items: ["Time Alignment", "Active Crossover Setup", "31-Band EQ Tuning", "RTA Analysis"],
            image: "/assets/images/service_dsp.png"
        },
        {
            title: "Head Unit & Multimedia",
            icon: <Radio className="w-8 h-8 text-white" />,
            items: ["Apple CarPlay / Android Auto", "Tesla-Style Screens", "HDMI & Video Integration", "Steering Wheel Controls"],
            image: "/assets/images/service_headunit.png"
        },
        {
            title: "Sound Deadening",
            icon: <Layers className="w-8 h-8 text-white" />,
            items: ["Door & Trunk Treatment", "Floor & Firewall Damping", "Rattle Reduction", "Road Noise Isolation"],
            image: "/assets/images/service_deadening.png"
        },
        {
            title: "Custom Fabrication",
            icon: <Hammer className="w-8 h-8 text-white" />,
            items: ["Custom Subwoofer Boxes", "Amp Racks & Beauty Panels", "LED Lighting Integration", "Fiberglass Work"],
            image: "/assets/images/service_fabrication.png"
        },
        {
            title: "OEM Integration",
            icon: <Cpu className="w-8 h-8 text-white" />,
            items: ["Factory Screen Retention", "CANBUS Integration", "High-Level Summing", "Clean Signal Restoration"],
            image: "/assets/images/service_oem.png"
        },
        {
            title: "Electrical Upgrades",
            icon: <Battery className="w-8 h-8 text-white" />,
            items: ["Big 3 Upgrade", "High-Output Alternators", "Lithium Battery Banks", "Fuse Blocks & Distribution"],
            image: "/assets/images/service_electrical.png"
        },
        {
            title: "Diagnostics & Repair",
            icon: <Wrench className="w-8 h-8 text-white" />,
            items: ["Ground Loop Noise Fixes", "Alternator Whine Removal", "Blown Speaker Replacement", "Wiring Repair"],
            image: "/assets/images/service_diagnostics.png"
        }
    ];

    const tintServices = [
        "Ceramic, Carbon, & Nano-Ceramic Films",
        "Heat, IR, & UV Reduction",
        "Full Car Packages (Front, Sides, Rear)",
        "Safety & Anti-Shatter Film",
        "Legal Tint Consultation"
    ];

    const cameraServices = [
        "Dash Cams (1CH, 2CH, 3CH)",
        "Reverse Camera Integration",
        "360° Bird-View Systems",
        "Blind Spot Monitoring",
        "Parking Mode Hardwiring"
    ];

    return (
        <div className="min-h-screen bg-background text-white selection:bg-accent/30">
            <Navbar />

            <main className="pb-20">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
                    {/* Background with Overlay */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/images/ServiceBanner.png')",
                            filter: "brightness(0.3)"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-0" />

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                        >
                            LUXURY <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-600">SERVICES</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-300 font-light tracking-wide"
                        >
                            Clean Wiring • Expert Tuning • World-Class Fabrication
                        </motion.p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                    {/* Main Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-accent/30 hover:bg-zinc-900/80 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col"
                            >
                                {/* Card Image with Overlay Icon */}
                                <div className="h-48 w-full relative overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />

                                    {/* Overlay Icon */}
                                    <div className="absolute top-4 left-4 z-20 p-3 bg-zinc-900/80 backdrop-blur-md rounded-xl border border-white/10 group-hover:bg-accent/80 transition-colors duration-300">
                                        {service.icon}
                                    </div>

                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-8 relative z-20 flex-grow">
                                    <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">
                                        {service.title}
                                    </h3>

                                    <ul className="space-y-2">
                                        {service.items.map((item, i) => (
                                            <li key={i} className="flex items-start text-sm text-gray-400">
                                                <span className="mr-2 text-accent/50 mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Services Section (Tint & Camera) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                        {/* Window Tinting */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 group flex flex-col"
                        >
                            {/* Image Header with Overlay Icon */}
                            <div className="h-64 w-full relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-80" />

                                <div className="absolute top-6 left-6 z-20 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 group-hover:bg-purple-500/80 transition-colors duration-300">
                                    <Sun className="w-8 h-8 text-white" />
                                </div>

                                <img
                                    src="/assets/images/service_tint.png"
                                    alt="Window Tinting"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-10 relative z-10 -mt-10">
                                <h2 className="text-3xl font-bold mb-6">Window Tinting</h2>
                                <ul className="space-y-4">
                                    {tintServices.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-purple-500/50 mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Camera Systems */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 group flex flex-col"
                        >
                            {/* Image Header with Overlay Icon */}
                            <div className="h-64 w-full relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-80" />

                                <div className="absolute top-6 left-6 z-20 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 group-hover:bg-blue-500/80 transition-colors duration-300">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>

                                <img
                                    src="/assets/images/service_camera.png"
                                    alt="Camera Systems"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-10 relative z-10 -mt-10">
                                <h2 className="text-3xl font-bold mb-6">Camera Systems</h2>
                                <ul className="space-y-4">
                                    {cameraServices.map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-300">
                                            <ShieldCheck className="w-5 h-5 text-blue-500/50 mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-accent/20 shadow-2xl shadow-accent/10 p-12 text-center md:p-20"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-accent/10 blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                Ready to <span className="text-accent">Transform</span> Your Ride?
                            </h2>
                            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Don't settle for factory sound. Contact our experts today for a custom quote tailored to your vehicle.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-300 bg-accent rounded-full shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_40px_rgba(255,85,0,0.6)] hover:bg-white"
                                >
                                    Book an Appointment
                                    <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
