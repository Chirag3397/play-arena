'use client';
import { motion } from 'framer-motion';
import { Check, Star, Trophy, Crown } from 'lucide-react';

const TIERS = [
    {
        name: 'CASUAL',
        price: '₹999',
        period: '/month',
        icon: <Star className="w-12 h-12 text-blue-400" />,
        color: 'blue',
        features: [
            '14 Hours of Gaming Time',
            'Access to PS5 & PS4'
        ],
        cta: 'Join Casual',
        glow: 'shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)]',
        border: 'border-blue-500/30 group-hover:border-blue-500'
    },
    {
        name: 'PRO',
        price: '₹1,999',
        period: '/month',
        icon: <Trophy className="w-12 h-12 text-primary" />,
        color: 'red',
        popular: true,
        features: [
            '31 Hours of Gaming Time (PS5 & PS4)',
            '1 Hour Car Simulator Access'
        ],
        cta: 'Go Pro',
        glow: 'shadow-[0_0_30px_rgba(236,19,19,0.3)] hover:shadow-[0_0_50px_rgba(236,19,19,0.6)]',
        border: 'border-primary/30 group-hover:border-primary'
    },
    {
        name: 'ELITE',
        price: '₹4,999',
        period: '/month',
        icon: <Crown className="w-12 h-12 text-yellow-400" />,
        color: 'yellow',
        features: [
            'Unlimited Gaming Time (PS5 & PS4)',
            '10 Hours Car Simulator Access'
        ],
        cta: 'Become Elite',
        glow: 'shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)]',
        border: 'border-yellow-500/30 group-hover:border-yellow-500'
    }
];

export default function MembershipsPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black italic">
                        LEVEL UP YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 text-glow">STATUS</span>
                    </h1>
                    <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                        Join the elite circle of Play Arena gamers. Unlock exclusive perks, priority access, and unlimited potential.
                    </p>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {TIERS.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative p-8 rounded-3xl bg-black/40 backdrop-blur-md border ${tier.border} transition-all duration-300 ${tier.glow} flex flex-col`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-gradient-to-r from-primary to-rose-600 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red-900/50">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 flex flex-col items-center text-center">
                                <div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-black italic tracking-wider mb-2">{tier.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-zinc-500 font-bold">{tier.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-zinc-300">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-${tier.color}-500/20 text-${tier.color}-500`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 ${tier.name === 'PRO'
                                ? 'bg-primary text-white hover:bg-red-600'
                                : 'bg-white/10 text-white hover:bg-white hover:text-black'
                                }`}>
                                {tier.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
