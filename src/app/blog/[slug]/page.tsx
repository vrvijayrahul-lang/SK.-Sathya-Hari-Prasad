'use client';

import { use, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getBlogPostBySlug } = useCMS();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Post not found</h1>
          <Link href="/" className="text-purple-400 text-sm hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl font-semibold text-white mt-10 mb-4">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith('```')) return null;
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-white/50 ml-4 mb-1 text-base leading-relaxed">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return (
        <p key={i} className="text-white/50 mb-4 text-base leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
        >
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-300 mb-12"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] as const }}
        >
          {/* Header */}
          <Badge variant="accent" size="md" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/30 mb-10 pb-10 border-b border-white/5">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
}
