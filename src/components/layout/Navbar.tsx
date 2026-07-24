'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, ArrowUpRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      {/* Floating Island Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 md:pt-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`}
      >
        <div
          className={`flex items-center justify-between px-5 md:px-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'glass-heavy shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'glass'
          } rounded-full w-auto min-w-[320px] md:min-w-[420px] h-14 md:h-16`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-white/90 hover:text-white transition-colors duration-300"
          >
            <span className="text-purple-400">~</span> sathya
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white/90 transition-all duration-300 rounded-full hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} className="text-white/80" /> : <List size={16} className="text-white/80" />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(48px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black/90"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl md:text-4xl font-light tracking-tight text-white/80 hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-500 active:scale-[0.98]"
                >
                  Let&apos;s Talk
                  <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
