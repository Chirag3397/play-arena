'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GAMES = [
    { id: 1, title: 'Tekken 8', image: '/images/tekken8.png', color: '#ff0000' },
    { id: 2, title: 'Valorant', image: '/images/valorant.png', color: '#ff4655' },
    { id: 3, title: 'Spider-Man 2', image: '/images/spiderman2.png', color: '#e62429' },
    { id: 4, title: 'GTA V', image: '/images/gta5.png', color: '#568f26' },
    { id: 5, title: 'FC 25', image: '/images/fifa25.png', color: '#313335' },
];

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % GAMES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between pt-32 md:pt-0 md:px-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            {/* Left Content (Text) */}
            {/* Mobile: Order 1 (Default) -> Text Top */}
            <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full break-words px-4 md:px-0 text-center md:text-left"
                >
                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none">
                        YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600 drop-shadow-[0_0_15px_rgba(236,19,19,0.5)]">ULTIMATE</span><br />
                        <span className="text-white">GAMING</span><br />
                        <span className="text-zinc-600 text-5xl md:text-7xl">DESTINATION</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-zinc-400 text-lg md:text-xl max-w-lg border-l-4 border-primary pl-6 text-center md:text-left mx-auto md:mx-0"
                >
                    Immerse yourself in the next generation of gaming. PS5s and professional Racing Simulators waiting for you.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-6 mt-4 mb-4 md:mb-0 w-full md:w-auto items-center md:items-start justify-center md:justify-start"
                >
                    <Link href="/booking" className="group relative px-8 py-4 bg-primary text-white font-black text-xl rounded skew-x-[-10deg] overflow-hidden transition-all hover:scale-105 hover:glow-red text-center w-full md:w-auto max-w-xs">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="skew-x-[10deg] inline-block relative z-10">BOOK A SLOT</span>
                    </Link>
                    <Link href="/menu" className="group px-8 py-4 border-2 border-zinc-800 text-white font-bold text-xl rounded skew-x-[-10deg] hover:border-primary hover:text-primary transition-all hover:scale-105 text-center w-full md:w-auto max-w-xs">
                        <span className="skew-x-[10deg] inline-block">VIEW RIGS</span>
                    </Link>
                </motion.div>
            </div>

            {/* Right Slider (Image) */}
            {/* Mobile: Order Last -> Image Bottom */}
            {/* Desktop: Order None -> Image Right */}
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end relative perspective-[2000px] mt-8 md:mt-0 order-last md:order-none">
                {/* 
                   Mobile: w-[80%] max-w-[300px] h-auto mx-auto
                   Desktop: md:w-[450px] md:max-w-none md:rotate-2
                */}
                <div className="relative w-[80%] max-w-[300px] h-auto aspect-[2/3] md:w-[450px] md:max-w-none md:h-[600px] preserve-3d mx-auto md:mx-0 md:rotate-2 hover:rotate-0 transition-transform duration-500">
                    <AnimatePresence mode="popLayout">
                        {GAMES.map((game, i) => {
                            const isCurrent = i === index;
                            if (!isCurrent) return null;

                            return (
                                <motion.div
                                    key={game.id}
                                    initial={{ opacity: 0, x: 200, scale: 0.8, rotateY: 45 }}
                                    animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, zIndex: 10 }}
                                    exit={{ opacity: 0, x: -200, scale: 0.8, rotateY: -45, zIndex: 0 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-zinc-900 group"
                                >
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-20">
                                        <h3 className="text-4xl font-black italic text-white drop-shadow-lg">{game.title}</h3>
                                        <div className="h-1 w-20 bg-primary mt-2"></div>
                                    </div>

                                    {/* Neon Border Glow */}
                                    <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none"></div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
export default Hero;
