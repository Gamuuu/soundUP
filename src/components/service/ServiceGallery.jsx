import React from 'react';
import SectionHeading from '../ui/SectionHeading';

const services = [
    { id: 1, title: 'เครื่องเสียงรถยนต์', description: 'ติดตั้งเครื่องเสียงรถยนต์ครบวงจร', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2783&auto=format&fit=crop' },
    { id: 2, title: 'จูนเสียงระบบ DSP', description: 'ปรับแต่งเสียงด้วยระบบ Digital Signal Processing', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop' },
    { id: 3, title: 'ติดตั้งกล้องหน้า-หลัง', description: 'กล้องบันทึกเหตุการณ์คมชัด Full HD', image: 'https://images.unsplash.com/photo-1626224169649-165f6c6e730e?q=80&w=2787&auto=format&fit=crop' },
    { id: 4, title: 'ฟิล์มกรองแสง', description: 'ฟิล์มกรองแสง UV คุณภาพสูง', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2787&auto=format&fit=crop' },
];

const ServiceGallery = () => {
    return (
        <section className="min-h-screen pt-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <SectionHeading>Our Services</SectionHeading>
                    <p className="text-gray-400 mt-4 max-w-2xl">บริการครบวงจรด้านเครื่องเสียงรถยนต์และอุปกรณ์ตกแต่ง</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="relative group overflow-hidden rounded-2xl h-[350px] border border-white/5">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                                <p className="text-gray-300 text-sm">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGallery;
