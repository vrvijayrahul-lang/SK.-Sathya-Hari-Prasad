'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, FolderOpen } from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { Badge } from '@/components/ui/Badge';

export function ProjectsGrid() {
  const { projects } = useCMS();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featured = projects.filter((p) => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as const },
    },
  };

  return (
    <section id="work" className="section-padding relative">
      <div className="radial-glow radial-glow-3" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-16 md:mb-24"
        >
          <span className="eyebrow mb-4 inline-flex">
            <FolderOpen size={12} weight="bold" />
            Selected Work
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3">
            Projects I&apos;ve
            <br />
            <span className="text-gradient-green">crafted</span>
          </h2>
        </motion.div>

        {/* Project Cards - Asymmetrical Bento */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30">No projects yet. Add some from the admin panel.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
          >
            {featured.slice(0, 6).map((project, index) => {
              const isWide = index % 3 === 0;
              const isTall = index % 4 === 0;

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`${
                    isWide ? 'md:col-span-8' : 'md:col-span-4'
                  } ${isTall ? 'md:row-span-2' : ''} col-span-1`}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="doppelrand-outer h-full group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]">
                      <div className="doppelrand-inner h-full p-6 md:p-8 flex flex-col relative overflow-hidden">
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Project image placeholder */}
                        <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 mb-6 flex items-center justify-center overflow-hidden">
                          {project.imageUrl ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <span className="text-3xl font-bold text-white/10 tracking-tight">
                                {project.title.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="accent" size="sm">
                              {project.category}
                            </Badge>
                            {project.client && (
                              <span className="text-[10px] text-white/30 font-medium">
                                {project.client}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-500">
                            {project.title}
                          </h3>

                          <p className="mt-2 text-sm text-white/40 leading-relaxed flex-1">
                            {project.description}
                          </p>

                          {/* Tags & link */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all duration-500 text-white/30">
                              <ArrowUpRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Non-featured */}
            {projects
              .filter((p) => !p.featured)
              .slice(0, 3)
              .map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="md:col-span-4 col-span-1"
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="doppelrand-outer h-full group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]">
                      <div className="doppelrand-inner h-full p-6 md:p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="blue" size="sm">
                            {project.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/40 leading-relaxed flex-1 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-white/30 font-medium">{project.category}</span>
                          <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all duration-500 text-white/30">
                            <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
