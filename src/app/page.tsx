'use client';

import dynamic from 'next/dynamic';
import { useCMS } from '@/context/CMSContext';

const Hero = dynamic(() => import('@/components/sections/Hero').then(m => ({ default: m.Hero })), { ssr: true });
const ProjectsGrid = dynamic(() => import('@/components/sections/ProjectsGrid').then(m => ({ default: m.ProjectsGrid })), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection').then(m => ({ default: m.SkillsSection })), { ssr: true });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(m => ({ default: m.AboutSection })), { ssr: true });
const BlogSection = dynamic(() => import('@/components/sections/BlogSection').then(m => ({ default: m.BlogSection })), { ssr: true });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })), { ssr: true });
const ContactSection = dynamic(() => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })), { ssr: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <SkillsSection />
      <AboutSection />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}
