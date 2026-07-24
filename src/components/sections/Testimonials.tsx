'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quotes, Star } from '@phosphor-icons/react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'CTO, TechCorp',
    content:
      'An absolute pleasure to work with. The level of craftsmanship and attention to detail is something I have rarely seen. The dashboard exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Design Director, Verdict Co.',
    content:
      'Sathya brought our design system to life with a level of polish that made our entire team rethink what was possible. Every component feels thoughtfully crafted.',
    rating: 5,
  },
  {
    name: 'Marcus Johansson',
    role: 'Founder, Pulse Health',
    content:
      'Working with Sathya was transformative for our product. The app went from good to exceptional — users consistently comment on how smooth and premium it feels.',
    rating: 5,
  },
  {
    name: 'Emily Nakamura',
    role: 'Product Lead, Synth Inc.',
    content:
      'The real-time collaboration features Sathya built are nothing short of magic. Our users love the fluid, responsive experience. A true engineering artist.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CEO, Verdant',
    content:
      'The 3D product viewer completely changed how our customers shop online. Conversion rates jumped 40%. Sathya delivers results, not just code.',
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-16"
        >
          <span className="eyebrow mb-4 inline-flex">
            <Quotes size={12} weight="bold" />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3">
            Kind words from{' '}
            <span className="text-gradient-green">clients</span>
          </h2>
        </motion.div>

        {/* Marquee scroll */}
        <div className="relative">
          <div className="flex gap-6 marquee w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="doppelrand-outer w-[380px] flex-shrink-0"
              >
                <div className="doppelrand-inner p-6 h-full">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} weight="fill" className="text-amber-400/80" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-4">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
