'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Menu as MenuIcon, User, LogIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-900 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            PLAY ARENA <span className="text-primary text-sm font-light tracking-widest block -mt-1">GAMING LOUNGE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/menu" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative group">
            Menu
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/memberships" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative group">
            Memberships
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/booking" className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors relative group">
            Bookings
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-primary/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-medium uppercase">Lounge is Open</span>
          </div>

          <SignedOut>
            <Link href="/sign-in" className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold uppercase tracking-wider text-xs rounded hover:bg-red-600 transition-all hover:glow-red skew-x-[-10deg]">
              <span className="skew-x-[10deg] flex items-center gap-2">Login <LogIn size={16} /></span>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-[101] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <MenuIcon size={32} />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 top-0 h-screen w-full bg-black z-[100] flex flex-col items-center justify-start pt-32 gap-8 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col items-center space-y-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black italic text-white hover:text-primary transition-colors"
                >
                  HOME
                </Link>
                <Link
                  href="/menu"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black italic text-white hover:text-primary transition-colors"
                >
                  MENU
                </Link>
                <Link
                  href="/memberships"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black italic text-white hover:text-primary transition-colors"
                >
                  MEMBERSHIPS
                </Link>
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black italic text-white hover:text-primary transition-colors"
                >
                  BOOKINGS
                </Link>
              </div>

              <div className="w-16 h-1 bg-zinc-800 rounded-full"></div>

              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold uppercase tracking-wider rounded hover:bg-red-600"
                >
                  Login <LogIn size={20} />
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="scale-150">
                  <UserButton />
                </div>
              </SignedIn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
export default Navbar;
