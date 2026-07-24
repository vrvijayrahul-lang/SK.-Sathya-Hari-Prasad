'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Database, DeviceMobile, Globe, Lightning } from '@phosphor-icons/react';
import { useCMS } from '@/context/CMSContext';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code,
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
  },
  {
    title: 'Design',
    icon: Palette,
    items: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping'],
    color: 'text-pink-400',
    borderColor: 'border-pink-500/20',
    bgColor: 'bg-pink-500/5',
  },
  {
    title: 'Backend',
    icon: Database,
    items: ['Node.js', 'PostgreSQL', 'GraphQL', 'REST APIs'],
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
  },
  {
    title: 'Mobile',
    icon: DeviceMobile,
    items: ['React Native', 'Expo', 'Mobile UI', 'App Store'],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
  },
  {
    title: 'Animation',
    icon: Lightning,
    items: ['GSAP', 'Three.js', 'WebGL', 'CSS Animation'],
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
  },
  {
    title: 'Performance',
    icon: Globe,
    items: ['Core Web Vitals', 'SEO', 'Caching', 'CDN'],
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
  },
];

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-16"
        >
          <span className="eyebrow mb-4 inline-flex">
            <Lightning size={12} weight="bold" />
            Expertise
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3">
            What I <span className="text-gradient">do best</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.32, 0.72, 0, 1] as const }}
              >
                <div className={`${cat.bgColor} ${cat.borderColor} border rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]`}>
                  <div className={`w-10 h-10 rounded-xl ${cat.bgColor} ${cat.borderColor} border flex items-center justify-center mb-4`}>
                    <Icon size={18} className={cat.color} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-3">{cat.title}</h3>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${cat.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
