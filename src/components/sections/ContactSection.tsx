'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { PaperPlaneTilt, CheckCircle, ArrowUpRight } from '@phosphor-icons/react';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

export function ContactSection() {
  const { settings, addMessage } = useCMS();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'New Inquiry',
      message: formData.message,
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
          >
            <span className="eyebrow mb-4 inline-flex">
              <PaperPlaneTilt size={12} weight="bold" />
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-3 leading-[1.05]">
              Let&apos;s create{' '}
              <span className="text-gradient">something</span>
              <br />
              extraordinary
            </h2>
            <p className="mt-6 text-base text-white/40 leading-relaxed max-w-md">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to
              push the boundaries of digital experiences.
            </p>

            <div className="mt-10 space-y-4">
              <ContactInfo label="Email" value={settings.email} href={`mailto:${settings.email}`} />
              <ContactInfo label="Location" value={settings.location} />
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] as const }}
          >
            {submitted ? (
              <div className="doppelrand-outer">
                <div className="doppelrand-inner p-10 text-center">
                  <span className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={24} className="text-emerald-400" />
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-white/40">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    id="name"
                    label="Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
                <Input
                  id="subject"
                  label="Subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                />
                <Textarea
                  id="message"
                  label="Message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  required
                />
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Send Message
                  <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowUpRight size={12} weight="bold" />
                  </span>
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ label, value, href }: { label: string; value: string; href?: string }) {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      href={href}
      className="flex items-center gap-3 group"
      {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
      </div>
      <div>
        <p className="text-xs text-white/30">{label}</p>
        <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
          {value}
        </p>
      </div>
    </Wrapper>
  );
}
