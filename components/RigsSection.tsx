'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Gamepad2, Car } from 'lucide-react';

const RIGS = [
    {
        id: 'ps5',
        title: 'PlayStation 5',
        icon: <Gamepad2 size={40} />,
        desc: 'Next-gen immersion with 4K HDR visuals, haptic feedback, and 120Hz refresh rates. Play Tekken 8, Spider-Man 2, and FC 25 in ultra-high definition.',
        price: '₹149/hr',
        color: 'from-blue-600 to-blue-900',
        glow: 'group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]'
    },
    {
        id: 'sim',
        title: 'Racing Simulator',
        icon: <Car size={40} />,
        desc: 'Professional-grade racing setup featuring Logitech G29 Force Feedback wheel, pedals, and bucket seat cockpit. Feel every turn in Assetto Corsa & F1 23.',
        price: '₹199/30min',
        color: 'from-purple-600 to-purple-900',
        glow: 'group-hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]'
    }
];

const RigsSection = () => {
    return (
        <section className="py-20 px-4 md:px-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-black italic mb-4">
                        CHOOSE YOUR <span className="text-primary">WEAPON</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {RIGS.map((rig, i) => (
                        <motion.div
                            key={rig.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden hover:-translate-y-2 transition-all duration-300 ${rig.glow}`}
                        >
                            {/* Card Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${rig.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                            <div className="relative z-10 flex flex-col gap-6 h-full">
                                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    {rig.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold italic mb-2">{rig.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{rig.desc}</p>
                                </div>

                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                    <div>
                                        <p className="text-xs text-zinc-500 uppercase font-bold">Starting at</p>
                                        <p className="text-xl font-bold text-white">{rig.price}</p>
                                    </div>
                                    <Link href={`/booking?type=${rig.id}`} className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-sm font-bold transition-colors">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default RigsSection;
