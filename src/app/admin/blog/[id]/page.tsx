'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react';
import Link from 'next/link';

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const { getBlogPost, updateBlogPost } = useCMS();
  const post = getBlogPost(params.id as string);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    imageUrl: '',
    published: true,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags.join(', '),
        imageUrl: post.imageUrl,
        published: post.published,
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30">Post not found</p>
        <Link href="/admin/blog" className="text-sm text-purple-400 mt-2 inline-block">Back to blog</Link>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateBlogPost(post.id, {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setSubmitted(true);
    setTimeout(() => router.push('/admin/blog'), 1500);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-emerald-400" />
          </span>
          <h3 className="text-xl font-semibold text-white mb-2">Post Updated!</h3>
          <p className="text-sm text-white/40">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog"><Button variant="ghost" size="sm" icon><ArrowLeft size={14} /></Button></Link>
        <div>
          <p className="text-sm text-white/40">Edit post</p>
          <h2 className="text-2xl font-bold text-white mt-1">{post.title}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Post Content</h3>
            <Input id="title" label="Post Title *" value={formData.title} onChange={(e) => setFormData(p => ({...p, title: e.target.value}))} required />
            <Input id="excerpt" label="Excerpt" value={formData.excerpt} onChange={(e) => setFormData(p => ({...p, excerpt: e.target.value}))} />
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Content (Markdown) *</label>
              <Textarea id="content" rows={16} value={formData.content} onChange={(e) => setFormData(p => ({...p, content: e.target.value}))} required />
            </div>
          </div>
        </div>

        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Metadata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input id="category" label="Category" value={formData.category} onChange={(e) => setFormData(p => ({...p, category: e.target.value}))} />
              <Input id="tags" label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData(p => ({...p, tags: e.target.value}))} />
            </div>
            <Input id="imageUrl" label="Cover Image URL" value={formData.imageUrl} onChange={(e) => setFormData(p => ({...p, imageUrl: e.target.value}))} />
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" checked={formData.published} onChange={(e) => setFormData(p => ({...p, published: e.target.checked}))} className="sr-only" />
                <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${formData.published ? 'bg-emerald-500/40' : 'bg-white/10'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 mt-1 ml-1 ${formData.published ? 'translate-x-4' : ''}`} />
                </div>
              </div>
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Published</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/blog"><Button variant="ghost" size="md" type="button">Cancel</Button></Link>
          <Button variant="primary" size="md" type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
