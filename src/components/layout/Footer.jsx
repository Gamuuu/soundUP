import React from 'react';
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const Footer = ({ className }) => {
    return (
        <footer className={`w-full text-white py-12 px-6 border-t border-white/5 ${className || 'bg-[#0a0a0a]'}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4">
                {/* Left Column - Brand & Social */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="text-4xl font-bold tracking-tighter">
                        Sound<span className="text-[#FF5500]">UP</span>
                    </Link>

                    <div className="flex gap-4">
                        {/* Instagram - Gradient BG */}
                        <a href="https://www.instagram.com/soundup_th?igsh=MWd0N2ZnN3dzMjg3ZQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform">
                            <Instagram size={24} className="text-white" />
                        </a>
                        {/* Facebook - Blue BG */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform">
                            <Facebook size={24} className="text-white" />
                        </a>
                        {/* Youtube - Red BG */}
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform">
                            <Youtube size={24} className="text-white fill-current" />
                        </a>
                        {/* Line - Green BG (Using MessageCircle as placeholder for Line) */}
                        <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#06C755] flex items-center justify-center hover:scale-110 transition-transform">
                            {/* Lucide doesn't have exact Line icon, using MessageCircle closest match or just text */}
                            <span className="font-bold text-xs">LINE</span>
                        </a>
                    </div>
                </div>

                {/* Right Column - Contact Info */}
                <div className="flex flex-col gap-4 max-w-xl text-right md:text-right text-left w-full md:w-auto">
                    <h2 className="text-3xl font-bold mb-2">
                        Contact <span className="text-[#FF5500]">us</span>
                    </h2>

                    <div className="flex flex-col gap-1 text-gray-300 text-sm md:text-base leading-relaxed items-start md:items-end">
                        <p>730 ถ.รัชดาภิเษก 7 (ท่าพระ-ตากสิน) แขวงบุคคโล เขตธนบุรี กรุงเทพฯ 10600</p>
                        <p className="font-medium">โทรศัพท์ : 081-300-1111</p>
                        <div className="h-2"></div>
                        <p>E-mail : Nuysoundup@gmail.com</p>
                        <p>Line ID: @soundup</p>
                        <p>Youtube : Soundup</p>
                        <p>Facebook : Sound UP ศูนย์ติดตั้งเครื่องเสียงรถยนต์ ฝั่งธน</p>
                        <p>Instagram : Soundupthai</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
