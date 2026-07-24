'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react';
import Link from 'next/link';

export default function NewProject() {
  const router = useRouter();
  const { addProject } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    tags: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    client: '',
    role: '',
    duration: '',
    featured: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    addProject({
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setSubmitted(true);
    setTimeout(() => router.push('/admin/projects'), 1500);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-emerald-400" />
          </span>
          <h3 className="text-xl font-semibold text-white mb-2">Project Created!</h3>
          <p className="text-sm text-white/40">Redirecting to projects list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" icon>
            <ArrowLeft size={14} />
          </Button>
        </Link>
        <div>
          <p className="text-sm text-white/40">Add to your portfolio</p>
          <h2 className="text-2xl font-bold text-white mt-1">New Project</h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Basic Information</h3>

            <Input
              id="title"
              label="Project Title *"
              placeholder="e.g. Nebula Dashboard"
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              required
            />

            <Input
              id="description"
              label="Short Description *"
              placeholder="A brief one-liner about the project"
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              required
            />

            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">
                Full Description
              </label>
              <Textarea
                id="longDescription"
                placeholder="Tell the full story of this project..."
                rows={6}
                value={formData.longDescription}
                onChange={(e) => setFormData((p) => ({ ...p, longDescription: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="category"
                label="Category"
                placeholder="e.g. Web App, Design System"
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
              />
              <Input
                id="tags"
                label="Tags (comma separated)"
                placeholder="e.g. React, TypeScript, Node"
                value={formData.tags}
                onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
              />
              <Input
                id="client"
                label="Client"
                placeholder="Client name (optional)"
                value={formData.client}
                onChange={(e) => setFormData((p) => ({ ...p, client: e.target.value }))}
              />
              <Input
                id="role"
                label="Your Role"
                placeholder="e.g. Lead Developer"
                value={formData.role}
                onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
              />
              <Input
                id="duration"
                label="Duration"
                placeholder="e.g. 3 months"
                value={formData.duration}
                onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Links & Media</h3>

            <Input
              id="imageUrl"
              label="Cover Image URL"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="liveUrl"
                label="Live URL"
                placeholder="https://..."
                value={formData.liveUrl}
                onChange={(e) => setFormData((p) => ({ ...p, liveUrl: e.target.value }))}
              />
              <Input
                id="githubUrl"
                label="GitHub URL"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData((p) => ({ ...p, githubUrl: e.target.value }))}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${formData.featured ? 'bg-purple-500/40' : 'bg-white/10'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 mt-1 ml-1 ${formData.featured ? 'translate-x-4' : ''}`} />
                </div>
              </div>
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                Feature this project
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/projects">
            <Button variant="ghost" size="md" type="button">Cancel</Button>
          </Link>
          <Button variant="primary" size="md" type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
