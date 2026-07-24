'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GithubLogo, LinkedinLogo, XLogo, DribbbleLogo, ArrowUpRight } from '@phosphor-icons/react';

export function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-semibold text-white">
              <span className="text-purple-400">~</span> sathya
            </Link>
            <p className="mt-3 text-sm text-white/40 max-w-xs leading-relaxed">
              Crafting premium digital experiences at the intersection of design and engineering.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[
                { icon: GithubLogo, href: '#' },
                { icon: LinkedinLogo, href: '#' },
                { icon: XLogo, href: '#' },
                { icon: DribbbleLogo, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Work', href: '/#work' },
                { label: 'About', href: '/#about' },
                { label: 'Blog', href: '/#blog' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white/90 transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-4">Get in Touch</h4>
            <a
              href="mailto:hello@sathya.dev"
              className="text-sm text-white/70 hover:text-white transition-colors duration-300 block"
            >
              hello@sathya.dev
            </a>
            <p className="mt-2 text-sm text-white/40">Based in Stockholm</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Sathya. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xs text-white/20 hover:text-white/50 transition-colors duration-300">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
