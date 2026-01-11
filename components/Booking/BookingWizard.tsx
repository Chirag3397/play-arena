'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Monitor, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookingWizard = () => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [rigType, setRigType] = useState('PS5');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBooking = async () => {
        setLoading(true);
        try {
            const res = await loadRazorpay();
            if (!res) {
                alert('Razorpay SDK failed to load');
                setLoading(false);
                return;
            }

            // 1. Create Order
            const orderRes = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: rigType === 'PS5' ? 149 : 199 }) // Dynamic pricing
            });
            const orderData = await orderRes.json();

            if (!orderData.id) {
                alert('Server error. Are API Keys set?');
                setLoading(false);
                return;
            }

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Play Arena Gaming Lounge',
                description: `Booking for ${rigType}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    // 3. Capture/Verify Payment (Skipped for demo, assumed success)
                    // 4. Create Booking in DB
                    const bookingRes = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: 'demo_user', // In real app, get from Clerk
                            rigType,
                            date,
                            startTime: time,
                            duration,
                            paymentId: response.razorpay_payment_id
                        })
                    });

                    if (bookingRes.ok) {
                        setStep(3);
                    }
                },
                prefill: {
                    name: "Gamer One",
                    email: "gamer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#ec1313"
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Steps Indicator */}
            <div className="flex justify-between mb-12 relative z-10">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 bg-black px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s ? 'bg-primary text-white shadow-[0_0_20px_rgba(236,19,19,0.5)]' : 'bg-zinc-800 text-zinc-500'}`}>
                            {s}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${step >= s ? 'text-white' : 'text-zinc-600'}`}>
                            {s === 1 ? 'Time' : s === 2 ? 'Rig' : 'Done'}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-black italic">WHEN ARE YOU <span className="text-primary">DROPPING IN?</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-2xl p-5 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(236,19,19,0.3)] transition-all font-mono"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Start Time</label>
                                <input
                                    type="time"
                                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-2xl p-5 text-white focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(236,19,19,0.3)] transition-all font-mono"
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Duration</label>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(h => (
                                    <button
                                        key={h}
                                        onClick={() => setDuration(h)}
                                        className={`p-4 rounded-2xl font-bold text-lg transition-all border-2 ${duration === h ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(236,19,19,0.4)]' : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                                    >
                                        {h}H
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={!date || !time}
                            onClick={() => setStep(2)}
                            className="w-full py-5 bg-white text-black font-black text-xl uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            Select Rig <ArrowRight size={24} />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-black italic">CHOOSE YOUR <span className="text-primary">PLATFORM</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['PS5', 'SIMULATOR'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setRigType(type)}
                                    className={`relative group p-8 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all overflow-hidden ${rigType === type ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(236,19,19,0.2)]' : 'border-zinc-800 bg-black/40 hover:border-zinc-600'}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 ${rigType === type ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                                    <span className="text-2xl font-black italic relative z-10">{type}</span>
                                    <span className="text-xs font-bold tracking-widest text-zinc-500 relative z-10">
                                        {type === 'PS5' ? '4K 120Hz • OLED' : 'Logitech G29'}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleBooking}
                            disabled={loading}
                            className="w-full py-5 bg-primary text-white font-black text-xl uppercase tracking-wider rounded-xl hover:bg-red-600 transition-colors hover:shadow-[0_0_40px_rgba(236,19,19,0.6)] flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : `Pay ₹${(rigType === 'PS5' ? 149 : 199) * duration}`}
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-10"
                    >
                        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(34,197,94,0.6)] animate-bounce">
                            <CheckCircle size={60} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-5xl font-black italic mb-4">BOOKED!</h2>
                            <p className="text-zinc-400 text-lg">Your slot is locked in. Get ready to game.</p>
                        </div>
                        <button onClick={() => router.push('/')} className="px-10 py-4 bg-zinc-800 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all"> Back to Base </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default BookingWizard;
