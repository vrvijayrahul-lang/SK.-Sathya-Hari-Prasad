'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { CheckCircle, Plus, TrashSimple, List } from '@phosphor-icons/react';
import type { NavLink } from '@/types';

const TABS = ['Profile', 'Hero & Sections', 'Navigation', 'Appearance', 'SEO', 'Footer & Contact', 'Maintenance'];

export default function AdminSettings() {
  const { settings, updateSettings } = useCMS();
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ ...settings });
  const [navLinks, setNavLinks] = useState<NavLink[]>(settings.customNavLinks);

  useEffect(() => {
    setFormData({ ...settings });
    setNavLinks(settings.customNavLinks);
  }, [settings]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings({ ...formData, customNavLinks: navLinks });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const update = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const updateSocial = (key: string, value: string) =>
    setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));

  const addNavLink = () => {
    setNavLinks(prev => [...prev, { label: '', href: '', visible: true }]);
  };

  const updateNavLink = (index: number, updates: Partial<NavLink>) => {
    setNavLinks(prev => prev.map((l, i) => (i === index ? { ...l, ...updates } : l)));
  };

  const removeNavLink = (index: number) => {
    setNavLinks(prev => prev.filter((_, i) => i !== index));
  };

  const sectionsToggle = (key: string) => {
    const k = key as keyof typeof formData;
    if (typeof formData[k] === 'boolean') {
      setFormData(prev => ({ ...prev, [k]: !prev[k] }));
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-white/40">Customize every aspect of your portfolio</p>
        <h2 className="text-2xl font-bold text-white mt-1">Settings</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/[0.04] pb-0.5">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === i
                ? 'text-white bg-white/5 border-b-2 border-purple-400'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 0 — PROFILE */}
        {activeTab === 0 && (
          <Section title="Profile">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input id="name" label="Your Name" value={formData.name} onChange={e => update('name', e.target.value)} />
              <Input id="title" label="Site Title" value={formData.title} onChange={e => update('title', e.target.value)} />
              <Input id="subtitle" label="Tagline" value={formData.subtitle} onChange={e => update('subtitle', e.target.value)} />
              <Input id="email" label="Email" type="email" value={formData.email} onChange={e => update('email', e.target.value)} />
              <Input id="phone" label="Phone" value={formData.phone} onChange={e => update('phone', e.target.value)} />
              <Input id="location" label="Location" value={formData.location} onChange={e => update('location', e.target.value)} />
              <Input id="avatarUrl" label="Avatar URL" value={formData.avatarUrl} onChange={e => update('avatarUrl', e.target.value)} />
            </div>
            <Input id="description" label="Meta Description" value={formData.description} onChange={e => update('description', e.target.value)} />

            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">About Text</label>
              <Textarea id="aboutText" rows={5} value={formData.aboutText} onChange={e => update('aboutText', e.target.value)} />
            </div>
            <Input id="skills" label="Skills (comma separated)" value={formData.skills.join(', ')} onChange={e => update('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />

            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-white/40 mt-4 mb-3">Social Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input id="github" label="GitHub" value={formData.socialLinks.github} onChange={e => updateSocial('github', e.target.value)} />
              <Input id="linkedin" label="LinkedIn" value={formData.socialLinks.linkedin} onChange={e => updateSocial('linkedin', e.target.value)} />
              <Input id="twitter" label="Twitter / X" value={formData.socialLinks.twitter} onChange={e => updateSocial('twitter', e.target.value)} />
              <Input id="dribbble" label="Dribbble" value={formData.socialLinks.dribbble} onChange={e => updateSocial('dribbble', e.target.value)} />
              <Input id="youtube" label="YouTube" value={formData.socialLinks.youtube} onChange={e => updateSocial('youtube', e.target.value)} />
              <Input id="instagram" label="Instagram" value={formData.socialLinks.instagram} onChange={e => updateSocial('instagram', e.target.value)} />
            </div>
          </Section>
        )}

        {/* TAB 1 — HERO & SECTIONS */}
        {activeTab === 1 && (
          <>
            <Section title="Hero Section">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input id="heroTitle" label="Hero Title" value={formData.heroTitle} onChange={e => update('heroTitle', e.target.value)} />
                <Input id="heroSubtitle" label="Hero Subtitle" value={formData.heroSubtitle} onChange={e => update('heroSubtitle', e.target.value)} />
              </div>
              <Input id="heroDescription" label="Hero Description" value={formData.heroDescription} onChange={e => update('heroDescription', e.target.value)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input id="ctaText" label="Primary CTA Text" value={formData.ctaText} onChange={e => update('ctaText', e.target.value)} />
                <Input id="ctaLink" label="Primary CTA Link" value={formData.ctaLink} onChange={e => update('ctaLink', e.target.value)} />
                <Input id="secondaryCtaText" label="Secondary CTA Text" value={formData.secondaryCtaText} onChange={e => update('secondaryCtaText', e.target.value)} />
              </div>
              <ToggleRow label="Show scroll-down indicator" enabled={formData.showScrollIndicator} onChange={() => update('showScrollIndicator', !formData.showScrollIndicator)} />
            </Section>

            <Section title="Section Visibility">
              <p className="text-xs text-white/40 mb-4">Toggle which sections appear on your homepage</p>
              <div className="space-y-3">
                {[
                  ['showWorkSection', 'Work / Projects'],
                  ['showSkillsSection', 'Skills & Expertise'],
                  ['showAboutSection', 'About'],
                  ['showBlogSection', 'Blog'],
                  ['showTestimonialsSection', 'Testimonials'],
                  ['showContactSection', 'Contact'],
                ].map(([key, label]) => (
                  <ToggleRow key={key} label={label as string} enabled={!!formData[key as keyof typeof formData]} onChange={() => sectionsToggle(key as string)} />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                <ToggleRow label="Featured projects first" enabled={formData.featuredProjectsFirst} onChange={() => update('featuredProjectsFirst', !formData.featuredProjectsFirst)} />
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Projects per page</label>
                  <input type="number" min={1} max={20} value={formData.projectsPerPage}
                    onChange={e => update('projectsPerPage', Number(e.target.value))}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-purple-500/30" />
                </div>
              </div>
            </Section>

            <Section title="Blog Settings">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input id="blogAuthor" label="Default Author" value={formData.blogAuthor} onChange={e => update('blogAuthor', e.target.value)} />
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Posts per page</label>
                  <input type="number" min={1} max={50} value={formData.blogPostsPerPage}
                    onChange={e => update('blogPostsPerPage', Number(e.target.value))}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-purple-500/30" />
                </div>
              </div>
              <ToggleRow label="Show read time on blog posts" enabled={formData.showReadTime} onChange={() => update('showReadTime', !formData.showReadTime)} />
            </Section>
          </>
        )}

        {/* TAB 2 — NAVIGATION */}
        {activeTab === 2 && (
          <>
            <Section title="Navigation Links">
              <p className="text-xs text-white/40 mb-4">Add, edit, or reorder navigation links</p>
              <div className="space-y-3">
                {navLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                    <List size={14} className="text-white/20 flex-shrink-0" />
                    <input
                      placeholder="Label"
                      value={link.label}
                      onChange={e => updateNavLink(i, { label: e.target.value })}
                      className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/30 min-w-0"
                    />
                    <input
                      placeholder="/path"
                      value={link.href}
                      onChange={e => updateNavLink(i, { href: e.target.value })}
                      className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/30 min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => updateNavLink(i, { visible: !link.visible })}
                      className={`px-2 py-1 text-[10px] font-medium rounded-md border transition-colors ${
                        link.visible
                          ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                          : 'text-white/30 border-white/10 bg-white/5'
                      }`}
                    >
                      {link.visible ? 'ON' : 'OFF'}
                    </button>
                    <button type="button" onClick={() => removeNavLink(i)} className="text-red-400/50 hover:text-red-400 transition-colors">
                      <TrashSimple size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={addNavLink} className="mt-3">
                <Plus size={12} /> Add Link
              </Button>
            </Section>

            <Section title="Navigation Settings">
              <ToggleRow label="Show CTA button in nav" enabled={formData.showNavCta} onChange={() => update('showNavCta', !formData.showNavCta)} />
              {formData.showNavCta && (
                <Input id="navCtaText" label="CTA Button Text" value={formData.navCtaText} onChange={e => update('navCtaText', e.target.value)} />
              )}
            </Section>
          </>
        )}

        {/* TAB 3 — APPEARANCE */}
        {activeTab === 3 && (
          <Section title="Appearance">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={e => update('accentColor', e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    value={formData.accentColor}
                    onChange={e => update('accentColor', e.target.value)}
                    className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.backgroundColor}
                    onChange={e => update('backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    value={formData.backgroundColor}
                    onChange={e => update('backgroundColor', e.target.value)}
                    className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Card Style</label>
                <select value={formData.cardStyle} onChange={e => update('cardStyle', e.target.value as 'glass' | 'bordered' | 'solid')}
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-purple-500/30">
                  <option value="glass">Glass</option>
                  <option value="bordered">Bordered</option>
                  <option value="solid">Solid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Layout Width</label>
                <select value={formData.layoutWidth} onChange={e => update('layoutWidth', e.target.value as 'narrow' | 'wide' | 'full')}
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-purple-500/30">
                  <option value="narrow">Narrow</option>
                  <option value="wide">Wide</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">Font Style</label>
                <select value={formData.fontStyle} onChange={e => update('fontStyle', e.target.value as 'modern' | 'classic' | 'minimal')}
                  className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-purple-500/30">
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>

            <ToggleRow label="Show grain/noise overlay" enabled={formData.showGrainOverlay} onChange={() => update('showGrainOverlay', !formData.showGrainOverlay)} />
          </Section>
        )}

        {/* TAB 4 — SEO */}
        {activeTab === 4 && (
          <Section title="SEO & Metadata">
            <p className="text-xs text-white/40 mb-4">Improve your site&apos;s search engine presence</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input id="metaKeywords" label="Meta Keywords" value={formData.metaKeywords} onChange={e => update('metaKeywords', e.target.value)} />
              <Input id="twitterHandle" label="Twitter Handle" value={formData.twitterHandle} onChange={e => update('twitterHandle', e.target.value)} />
            </div>
            <Input id="ogImageUrl" label="Open Graph Image URL (1200x630)" value={formData.ogImageUrl} onChange={e => update('ogImageUrl', e.target.value)} />
            <Input id="facebookUrl" label="Facebook URL" value={formData.facebookUrl} onChange={e => update('facebookUrl', e.target.value)} />
            <Input id="googleAnalyticsId" label="Google Analytics ID" placeholder="G-XXXXXXXXXX" value={formData.googleAnalyticsId} onChange={e => update('googleAnalyticsId', e.target.value)} />
          </Section>
        )}

        {/* TAB 5 — FOOTER & CONTACT */}
        {activeTab === 5 && (
          <>
            <Section title="Footer">
              <Input id="footerDescription" label="Footer Description" value={formData.footerDescription} onChange={e => update('footerDescription', e.target.value)} />
              <Input id="copyrightText" label="Copyright Text" value={formData.copyrightText} onChange={e => update('copyrightText', e.target.value)} />
              <ToggleRow label="Show social links in footer" enabled={formData.showFooterSocial} onChange={() => update('showFooterSocial', !formData.showFooterSocial)} />
            </Section>

            <Section title="Contact Section">
              <ToggleRow label="Enable contact form" enabled={formData.contactFormEnabled} onChange={() => update('contactFormEnabled', !formData.contactFormEnabled)} />
              <ToggleRow label="Show contact info (email, location)" enabled={formData.showContactInfo} onChange={() => update('showContactInfo', !formData.showContactInfo)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input id="contactEmail" label="Contact Email" value={formData.contactEmail} onChange={e => update('contactEmail', e.target.value)} />
                <Input id="calendarLink" label="Calendar / Booking Link" placeholder="https://calendly.com/..." value={formData.calendarLink} onChange={e => update('calendarLink', e.target.value)} />
              </div>
              <Input id="contactSuccessMessage" label="Success Message" value={formData.contactSuccessMessage} onChange={e => update('contactSuccessMessage', e.target.value)} />
            </Section>
          </>
        )}

        {/* TAB 6 — MAINTENANCE */}
        {activeTab === 6 && (
          <Section title="Maintenance Mode">
            <div className={`p-4 rounded-xl border ${formData.maintenanceMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/[0.02] border-white/5'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-white">Maintenance Mode</p>
                  <p className="text-xs text-white/40 mt-0.5">When enabled, visitors see a maintenance message instead of your site</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.maintenanceMode} onChange={() => update('maintenanceMode', !formData.maintenanceMode)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500/50" />
                </label>
              </div>
              {formData.maintenanceMode && (
                <div className="space-y-4">
                  <Input id="maintenanceMessage" label="Maintenance Message" value={formData.maintenanceMessage} onChange={e => update('maintenanceMessage', e.target.value)} />
                  <Input id="allowedIps" label="Allowed IPs (comma separated)" placeholder="127.0.0.1, ::1" value={formData.allowedIps} onChange={e => update('allowedIps', e.target.value)} />
                  <p className="text-[10px] text-white/30">Admins logged in via Firebase Auth bypass maintenance mode automatically.</p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Save Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.04]">
          <Button variant="ghost" size="md" type="button" onClick={() => { setFormData({ ...settings }); setNavLinks(settings.customNavLinks); }}>
            Reset Tab
          </Button>
          <Button variant="primary" size="md" type="submit" className="relative">
            {submitted ? (
              <span className="flex items-center gap-2"><CheckCircle size={14} /> Saved!</span>
            ) : (
              'Save All Settings'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ---- Sub-components ----

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="doppelrand-outer">
      <div className="doppelrand-inner p-6 space-y-5">
        <h3 className="text-sm font-semibold text-white/80">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-1">
      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={onChange} className="sr-only peer" />
        <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500/50" />
      </label>
    </label>
  );
}