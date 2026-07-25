'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, MapPin, Envelope } from '@phosphor-icons/react';
import { useCMS } from '@/context/CMSContext';

export function AboutSection() {
  const { settings } = useCMS();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-16"
        >
          <span className="eyebrow mb-4 inline-flex">
            <User size={12} weight="bold" />
            About
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3">
            The person <br />
            <span className="text-gradient">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left - Avatar + Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] as const }}
            className="lg:col-span-2"
          >
            <div className="doppelrand-outer w-full aspect-[3/4] max-w-sm">
              <div className="doppelrand-inner w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-emerald-500/5 overflow-hidden relative">
                {settings.avatarUrl ? (
                  <img
                    src={settings.avatarUrl}
                    alt={settings.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : null}
                <span className={`text-8xl font-bold text-white/10 ${settings.avatarUrl ? 'hidden' : ''}`}>
                  {settings.name.charAt(0)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin size={14} className="text-purple-400" />
                {settings.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Envelope size={14} className="text-purple-400" />
                {settings.email}
              </div>
            </div>
          </motion.div>

          {/* Right - About text + Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
            className="lg:col-span-3"
          >
            <div className="prose prose-invert max-w-none">
              {settings.aboutText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg text-white/50 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-4">
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {settings.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/60 border border-white/5 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
