'use client';

import { use, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  GithubLogo,
  Calendar,
  Clock,
  User,
  Tag,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getProjectBySlug } = useCMS();
  const project = getProjectBySlug(slug);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
          <Link href="/" className="text-purple-400 text-sm hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-300 mb-12"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] as const }}
            className="lg:col-span-7"
          >
            {/* Hero Image */}
            <div className="doppelrand-outer mb-8">
              <div className="doppelrand-inner w-full aspect-video flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-emerald-500/5">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-[1.5rem]" />
                ) : (
                  <span className="text-6xl font-bold text-white/10">{project.title.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {project.title}
            </h1>

            <p className="text-lg text-white/40 leading-relaxed mb-8">
              {project.description}
            </p>

            {project.longDescription && (
              <div className="prose prose-invert max-w-none">
                {project.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base text-white/50 leading-relaxed mb-5">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="mt-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/5 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
            className="lg:col-span-5"
          >
            <div className="doppelrand-outer sticky top-28">
              <div className="doppelrand-inner p-6 space-y-6">
                <h3 className="text-sm font-semibold text-white/80">Project Details</h3>

                {project.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Category</span>
                    <Badge variant="accent">{project.category}</Badge>
                  </div>
                )}

                {project.client && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Client</span>
                    <span className="text-sm text-white/70">{project.client}</span>
                  </div>
                )}

                {project.role && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Role</span>
                    <span className="text-sm text-white/70">{project.role}</span>
                  </div>
                )}

                {project.duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Duration</span>
                    <span className="text-sm text-white/70">{project.duration}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">Date</span>
                  <span className="text-sm text-white/70 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(project.date)}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="primary" size="md" className="w-full">
                        View Live
                        <ArrowUpRight size={14} weight="bold" />
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="secondary" size="md" className="w-full">
                        <GithubLogo size={14} />
                        View Source
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
