import React from 'react';
import NeonCube from '../ui/NeonCube';
import SectionHeading from '../ui/SectionHeading';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

const ContactHero = () => {
    return (
        <section className="min-h-screen pt-24 px-6 pb-20 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <SectionHeading className="mb-6">Contact Us</SectionHeading>
                    <div className="flex justify-center my-12">
                         <NeonCube size={150} />
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        มีคำถามเกี่ยวกับสินค้าหรือต้องการติดตั้งเครื่องเสียง? ทีมงานพร้อมให้บริการ
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Contact Info */}
                    <div className="space-y-8">
                        {/* Phone */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors group flex gap-4 items-start">
                            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                <Phone className="text-accent" size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">โทรหาเรา</h3>
                                <p className="text-accent text-2xl font-bold">081-300-1111</p>
                                <p className="text-gray-500 text-sm mt-1">เปิดบริการ: จันทร์ - อาทิตย์ 9:00 - 18:00 น.</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors group flex gap-4 items-start">
                            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                <Mail className="text-accent" size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">อีเมล</h3>
                                <p className="text-white text-lg">Nuysoundup@gmail.com</p>
                                <p className="text-gray-500 text-sm mt-1">ตอบกลับภายใน 24 ชั่วโมง</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors group flex gap-4 items-start">
                            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                <MapPin className="text-accent" size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">ที่อยู่</h3>
                                <p className="text-gray-300">730 ถ.รัชดาภิเษก 7 (ท่าพระ-ตากสิน)</p>
                                <p className="text-gray-300">แขวงบุคคโล เขตธนบุรี กรุงเทพฯ 10600</p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold mb-4">ติดตามเรา</h3>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/soundup_th?igsh=MWd0N2ZnN3dzMjg3ZQ==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform">
                                    <Instagram size={24} className="text-white" />
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform">
                                    <Facebook size={24} className="text-white" />
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform">
                                    <Youtube size={24} className="text-white" />
                                </a>
                                <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#06C755] flex items-center justify-center hover:scale-110 transition-transform">
                                    <span className="font-bold text-xs text-white">LINE</span>
                                </a>
                            </div>
                            <div className="mt-4 text-gray-400 text-sm space-y-1">
                                <p>Instagram: <span className="text-white">@soundup_th</span></p>
                                <p>Facebook: <span className="text-white">Sound UP ศูนย์ติดตั้งเครื่องเสียงรถยนต์ ฝั่งธน</span></p>
                                <p>Youtube: <span className="text-white">Soundup</span></p>
                                <p>Line ID: <span className="text-white">@soundup</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Google Map */}
                    <div className="h-full min-h-[500px]">
                        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 h-full">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MapPin className="text-accent" size={24} />
                                แผนที่
                            </h3>
                            <div className="rounded-xl overflow-hidden h-[calc(100%-60px)]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8466!2d100.4797!3d13.7236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d6fce4f2c3%3A0x1234567890abcdef!2s730%20Ratchadaphisek%20Rd%2C%20Bukkhalo%2C%20Thonburi%2C%20Bangkok%2010600%2C%20Thailand!5e0!3m2!1sen!2sth!4v1234567890123!5m2!1sen!2sth"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '400px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SoundUp Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;
