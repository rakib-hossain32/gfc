"use client";

import Link from "next/link";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

import { useSettings } from "@/src/components/providers/SettingsProvider";

export function Footer() {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white relative overflow-hidden">
      {/* Premium Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-24 -left-24 size-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-20">

          {/* Brand Column - 4 Columns Wide on LG */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl">
                <Building2 className="size-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none italic uppercase">
                  {settings.siteName.split(' ')[0] || "RIYADH"}
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase leading-none mt-1">
                  {settings.siteName.split(' ').slice(1).join(' ') || "Popular"}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {settings.metaDescription}
            </p>

            <div className="flex items-center gap-3">
              <SocialLink href={settings.facebook || "#"} icon={Facebook} label="Facebook" />
              <SocialLink href={settings.instagram || "#"} icon={Instagram} label="Instagram" />
              <SocialLink href={settings.linkedin || "#"} icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Quick Links - 2 Columns Wide on LG */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="size-1 bg-primary rounded-full" /> Navigation
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/about">Our Identity</FooterLink>
              <FooterLink href="/projects">Portfolio</FooterLink>
              <FooterLink href="/services">Sectors</FooterLink>
              <FooterLink href="/contact">Inquiry</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </div>

          {/* Services - 3 Columns Wide on LG */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="size-1 bg-primary rounded-full" /> Expertise
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/services/maintenance">Facility Maintenance</FooterLink>
              <FooterLink href="/services/cleaning">Eco-Tech Cleaning</FooterLink>
              <FooterLink href="/services/manpower">Specialized Manpower</FooterLink>
              <FooterLink href="/services/logistics">Logistics Support</FooterLink>
              <FooterLink href="/services/construction">Smart Construction</FooterLink>
            </ul>
          </div>

          {/* Contact - 3 Columns Wide on LG */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="size-1 bg-primary rounded-full" /> HQ Presence
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group cursor-default">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Office</p>
                  <span className="text-slate-300 text-xs leading-relaxed">
                    {settings.address}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-default">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact</p>
                  <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-slate-300 text-xs hover:text-white transition-colors">{settings.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-default">
                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Support</p>
                  <a href={`mailto:${settings.email}`} className="text-slate-300 text-xs hover:text-white transition-colors">{settings.email}</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM RIBBON --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-2 text-primary opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <ShieldCheck className="size-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Quality Certified</span>
            </div>
            <div className="flex items-center gap-2 text-primary opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <Globe className="size-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Operations</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              &copy; {currentYear} {settings.siteName}. Built for Excellence.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <div className="size-1 bg-white/10 rounded-full" />
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Visual Glow */}
      <div className="absolute bottom-0 right-0 w-1/2 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all duration-300"
    >
      <Icon className="size-5" />
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-slate-400 hover:text-primary text-sm font-medium transition-all flex items-center gap-2 group"
      >
        <span className="size-1 rounded-full bg-slate-800 group-hover:bg-primary group-hover:scale-150 transition-all" />
        <span className="group-hover:translate-x-1 transition-transform">{children}</span>
      </Link>
    </li>
  );
}
