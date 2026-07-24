'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Article, ArrowRight, Clock } from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export function BlogSection() {
  const { blogPosts } = useCMS();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const published = blogPosts.filter((p) => p.published);

  return (
    <section id="blog" className="section-padding relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          className="mb-16"
        >
          <span className="eyebrow mb-4 inline-flex">
            <Article size={12} weight="bold" />
            Blog
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3">
            Thoughts on{' '}
            <span className="text-gradient-green">design &amp; code</span>
          </h2>
        </motion.div>

        {published.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-white/5">
            <Article size={32} className="mx-auto text-white/10 mb-3" />
            <p className="text-white/30">No blog posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.slice(0, 6).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.32, 0.72, 0, 1] as const }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="doppelrand-outer h-full group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]">
                    <div className="doppelrand-inner h-full p-6 flex flex-col">
                      {/* Category */}
                      <Badge variant="accent" size="sm" className="w-fit mb-3">
                        {post.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-500 leading-snug">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-2 text-sm text-white/40 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/30">
                          <span>{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all duration-500 text-white/30">
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
