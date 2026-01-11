'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Pizza, UtensilsCrossed, Tag } from 'lucide-react';

const CATEGORIES = [
    { id: 'ALL', name: 'All' },
    { id: 'QUICK_BITES', name: 'Quick Bites', icon: <Pizza size={16} /> },
    { id: 'FUEL_STATION', name: 'Fuel Station', icon: <Coffee size={16} /> },
    { id: 'GAMER_COMBOS', name: 'Gamer Combos', icon: <UtensilsCrossed size={16} /> }
];

const ITEMS = [
    { id: 1, name: 'Cyber Nachos', category: 'QUICK_BITES', price: '₹149', desc: 'Loaded with cheese, jalapeños, and secret spicy salsa.', image: '🌮' },
    { id: 2, name: 'FPS Fries', category: 'QUICK_BITES', price: '₹99', desc: 'Crispy perimeter fries with peri-peri dust.', image: '🍟' },
    { id: 3, name: 'Chicken Wings (6pcs)', category: 'QUICK_BITES', price: '₹249', desc: 'Glazed in BBQ or Buffalo sauce.', image: '🍗' },

    { id: 4, name: 'Red Bull', category: 'FUEL_STATION', price: '₹150', desc: 'Wings for your rank push.', image: '🐂' },
    { id: 9, name: 'Neon Energy', category: 'FUEL_STATION', price: '₹129', desc: 'Blue raspberry energy fizz. Instant reflex boost.', image: '⚡' },
    { id: 5, name: 'Dark Roast Cold Coffee', category: 'FUEL_STATION', price: '₹149', desc: 'Brewed over 12 hours. Keeps you awake for rank push.', image: '🥤' },
    { id: 6, name: 'Mana Potion', category: 'FUEL_STATION', price: '₹99', desc: 'Fresh blueberry lemonade with mint.', image: '🫐' },

    { id: 7, name: 'The Solo Carry', category: 'GAMER_COMBOS', price: '₹299', desc: 'Chicken Burger + FPS Fries + Coke', image: '🍔' },
    { id: 8, name: 'Squad Pack (For 4)', category: 'GAMER_COMBOS', price: '₹999', desc: '2 Large Pizzas + 2 Garlic Breads + 4 Drinks', image: '🍕' },
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('ALL');

    const filteredItems = activeCategory === 'ALL'
        ? ITEMS
        : ITEMS.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black italic mb-4">
                        FUEL YOUR <span className="text-primary text-glow">GAME</span>
                    </h1>
                    <p className="text-zinc-400 text-xl">Top-tier loot for hungry gamers.</p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2 ${activeCategory === cat.id
                                ? 'bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                                }`}
                        >
                            {cat.icon}
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:bg-zinc-800/50 transition-colors overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none">
                                    {item.image}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded uppercase tracking-wider">{item.category}</span>
                                    </div>

                                    <h3 className="text-2xl font-black italic mb-2 group-hover:text-white transition-colors text-zinc-100">{item.name}</h3>
                                    <p className="text-zinc-400 text-sm mb-6 flex-1">{item.desc}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                        <span className="text-2xl font-black text-primary text-glow">{item.price}</span>
                                        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <Tag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
