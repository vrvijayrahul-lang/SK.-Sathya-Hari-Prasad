'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mouse } from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';

export function Hero() {
  const { settings } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="radial-glow radial-glow-1" />
      <div className="radial-glow radial-glow-2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <span className="eyebrow mb-8 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for projects
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] as const }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] text-white mt-4"
        >
          {settings.heroTitle}{' '}
          <span className="text-gradient block sm:inline">{settings.heroSubtitle}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
          className="mt-8 text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed"
        >
          {settings.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.32, 0.72, 0, 1] as const }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            {settings.ctaText}
            <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-sm font-medium text-white/70 hover:text-white/90 hover:bg-white/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-medium">Scroll</span>
        <Mouse size={14} className="text-white/20" />
      </motion.div>
    </section>
  );
}
