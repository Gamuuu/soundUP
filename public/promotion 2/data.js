import { Music, Zap, Layers, Gift } from 'lucide-react';

// ข้อมูล promotions สำหรับ Christmas และ New Year
export const promotionsData = {
    christmas: [
        {
            id: 'xmas-1',
            title: 'Silent Night Damping',
            discount: '30% OFF',
            description: 'Premium Car Damping System for a quieter ride.',
            code: 'SILENTNIGHT30',
            icon: Layers,
            type: 'damping'
        },
        {
            id: 'xmas-2',
            title: 'Jingle Bass Speakers',
            discount: 'Buy 1 Get 1 50%',
            description: 'High-fidelity Component Speakers.',
            code: 'JINGLEBASS',
            icon: Music,
            type: 'speakers'
        }
    ],
    newyear: [
        {
            id: 'ny-1',
            title: 'Countdown Amp Upgrade',
            discount: '$100 OFF',
            description: 'High-performance 4-Channel Amplifier.',
            code: 'COUNTDOWN100',
            icon: Zap,
            type: 'amp'
        },
        {
            id: 'ny-2',
            title: 'New Year New Sound',
            discount: 'Free Install',
            description: 'Complete Sound System Bundle.',
            code: 'NEWYEARSOUND',
            icon: Gift,
            type: 'bundle'
        }
    ]
};

// ข้อมูล promotions สำหรับแสดงใน Home page
export const homePromotions = [
    { title: 'Summer Sale', discount: '20% OFF', color: 'from-orange-500/20 to-orange-900/20' },
    { title: 'New Arrivals', discount: 'Check it out', color: 'from-blue-500/20 to-blue-900/20' },
    { title: 'Member Exclusive', discount: 'Points x2', color: 'from-purple-500/20 to-purple-900/20' },
    { title: 'Clearance', discount: 'Up to 50%', color: 'from-red-500/20 to-red-900/20' },
];

// ข้อมูล products ตาม category
export const productsByCategory = {
    speakers: [
        { name: "Jingle Bass Series", price: "$199", oldPrice: "$299", image: "/assets/images/products/jingle-bass.png" },
        { name: "Harmonix Coaxial", price: "$149", oldPrice: "$249", image: "/assets/images/products/harmonix.png" },
        { name: "Vocalist Pro", price: "$299", oldPrice: "$450" }
    ],
    amplifiers: [
        { name: 'Countdown Monoblock', desc: 'Class D 1000W RMS', price: '$349', originalPrice: '$499' },
        { name: 'Quartet 4-Channel', desc: 'High-Fidelity AB Class', price: '$279', originalPrice: '$380' },
        { name: 'DSP Integration', desc: 'Processor + Amp Combo', price: '$599', originalPrice: '$850' }
    ],
    subwoofers: [
        { name: 'Seismic 12"', desc: 'Dual Voice Coil Sub', price: '$249', originalPrice: '$350' },
        { name: 'Compact Bass Tube', desc: 'Active Enclosure', price: '$189', originalPrice: '$260' },
        { name: 'Underseat Active', desc: 'Space Saving Punch', price: '$159', originalPrice: '$210' }
    ]
};

// ข้อมูล specs สำหรับ speakers
export const speakerSpecs = [
    { label: "Frequency", value: "45Hz - 22kHz" },
    { label: "Sensitivity", value: "92dB" },
    { label: "Impedance", value: "4 Ohms" }
];
