'use client';

import { motion } from 'framer-motion';
import { ContactSection } from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-4"
        >
          <span className="eyebrow inline-flex">Get in Touch</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] as const }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-12"
        >
          Let&apos;s work <span className="text-gradient">together</span>
        </motion.h1>
      </div>
      <ContactSection />
    </div>
  );
}
