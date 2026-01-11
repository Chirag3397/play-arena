import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">P</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white">
                                PLAY ARENA <span className="text-primary text-sm font-light tracking-widest block -mt-1">GAMING LOUNGE</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 max-w-md">
                            The ultimate gaming destination with next-gen consoles, pro-grade simulators, and a community for champions. Level up your game today.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-zinc-500 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/menu" className="text-zinc-500 hover:text-primary transition-colors">Menu & Drinks</Link></li>
                            <li><Link href="/memberships" className="text-zinc-500 hover:text-primary transition-colors">Memberships</Link></li>
                            <li><Link href="/booking" className="text-zinc-500 hover:text-primary transition-colors">Book a Slot</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6">Locate Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-500">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span>
                                    12, Gamers Street,<br />
                                    Tech Park, Bangalore - 560001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-500">
                                <Phone className="text-primary shrink-0" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-500">
                                <Mail className="text-primary shrink-0" size={20} />
                                <span>contact@playarena.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-sm">
                        © 2026 Play Arena Gaming Lounge. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Facebook size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
