'use client';

import { useState, FormEvent } from 'react';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { CheckCircle } from '@phosphor-icons/react';

export default function AdminSettings() {
  const { settings, updateSettings } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ ...settings });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-white/40">Customize your portfolio</p>
        <h2 className="text-2xl font-bold text-white mt-1">Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile */}
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input id="name" label="Name" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
              <Input id="email" label="Email" type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} />
              <Input id="location" label="Location" value={formData.location} onChange={(e) => setFormData(p => ({...p, location: e.target.value}))} />
              <Input id="avatarUrl" label="Avatar URL" value={formData.avatarUrl} onChange={(e) => setFormData(p => ({...p, avatarUrl: e.target.value}))} />
            </div>
            <Input id="description" label="Description" value={formData.description} onChange={(e) => setFormData(p => ({...p, description: e.target.value}))} />
          </div>
        </div>

        {/* Hero */}
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Hero Section</h3>
            <Input id="heroTitle" label="Hero Title" value={formData.heroTitle} onChange={(e) => setFormData(p => ({...p, heroTitle: e.target.value}))} />
            <Input id="heroSubtitle" label="Hero Subtitle" value={formData.heroSubtitle} onChange={(e) => setFormData(p => ({...p, heroSubtitle: e.target.value}))} />
            <Input id="ctaText" label="CTA Button Text" value={formData.ctaText} onChange={(e) => setFormData(p => ({...p, ctaText: e.target.value}))} />
          </div>
        </div>

        {/* About */}
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">About</h3>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">About Text</label>
              <Textarea id="aboutText" rows={6} value={formData.aboutText} onChange={(e) => setFormData(p => ({...p, aboutText: e.target.value}))} />
            </div>
            <Input id="skills" label="Skills (comma separated)" value={formData.skills.join(', ')} onChange={(e) => setFormData(p => ({...p, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)}))} />
          </div>
        </div>

        {/* Social Links */}
        <div className="doppelrand-outer">
          <div className="doppelrand-inner p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white/80">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input id="github" label="GitHub URL" value={formData.socialLinks.github} onChange={(e) => setFormData(p => ({...p, socialLinks: {...p.socialLinks, github: e.target.value}}))} />
              <Input id="linkedin" label="LinkedIn URL" value={formData.socialLinks.linkedin} onChange={(e) => setFormData(p => ({...p, socialLinks: {...p.socialLinks, linkedin: e.target.value}}))} />
              <Input id="twitter" label="Twitter / X URL" value={formData.socialLinks.twitter} onChange={(e) => setFormData(p => ({...p, socialLinks: {...p.socialLinks, twitter: e.target.value}}))} />
              <Input id="dribbble" label="Dribbble URL" value={formData.socialLinks.dribbble} onChange={(e) => setFormData(p => ({...p, socialLinks: {...p.socialLinks, dribbble: e.target.value}}))} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" size="md" type="button" onClick={() => setFormData({ ...settings })}>
            Reset
          </Button>
          <Button variant="primary" size="md" type="submit" className="relative">
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle size={14} /> Saved!
              </span>
            ) : (
              'Save Settings'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
