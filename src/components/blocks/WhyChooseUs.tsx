import React from 'react';
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  HardHat, 
  ArrowRight,
  Target,
  BarChart3,
  Clock
} from "lucide-react";
import { Button } from '../ui/button';
import Link from "next/link";
import Image from "next/image";


const reasons = [
  {
    title: "Unmatched Reliability",
    desc: "24/7 dedicated support for Riyadh's elite corporate sectors.",
    icon: ShieldCheck,
    tag: "Reliability"
  },
  {
    title: "DP Expertise",
    desc: "100+ technicians for high-complexity energy environments.",
    icon: Zap,
    tag: "Technical"
  },
  {
    title: "Safety First",
    desc: "Strict zero-accident policy with advanced risk management.",
    icon: HardHat,
    tag: "Operational"
  },
  {
    title: "Local Excellence",
    desc: "Deep expertise in Saudi Arabia's unique industrial landscape.",
    icon: Target,
    tag: "Strategic"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Micro-details */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
      />

      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left: Content Block */}
          <div className="lg:w-5/12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3">
                 <div className="w-10 h-px bg-primary" />
                 <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">The Advantage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-accent leading-[1.15]">
                Why Industry Leaders <br /> 
                <span className="text-primary">Trust Our Vision.</span>
              </h2>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Engineering operational stability for the Kingdom&#39;s most ambitious projects with precision and technical mastery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-50 bg-slate-50/30 group hover:border-primary/20 transition-all duration-500">
                <div className="size-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-accent">12+ Years</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Market Experience</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-50 bg-slate-50/30 group hover:border-primary/20 transition-all duration-500">
                <div className="size-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                  <BarChart3 className="size-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-accent">500+ Projects</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Successful Delivery</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-start sm:justify-center lg:justify-start">
              {/* <Link href="/contact">
                <Button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 group">
                  Partner With Us
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link> */}
              <Button asChild className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300">
            <Link href="/contact" className="flex items-center justify-center gap-2">
              Partner With Us <ArrowRight className="size-4 md:size-5" />
            </Link>
          </Button>
            </div>
          </div>

          {/* Right: Modern Feature Grid (Refined & Compact) */}
          <div className="lg:w-7/12 grid sm:grid-cols-2 gap-4">
            {reasons.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <item.icon className="size-5" />
                  </div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest px-2 py-1 bg-slate-50 rounded">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-accent mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-xs text-muted leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
            
            {/* Visual Accent Card */}
            <div className="sm:col-span-2 mt-2 h-48 rounded-2xl overflow-hidden relative shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
                alt="Corporate Architecture" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-accent/90 via-accent/40 to-transparent flex items-center px-10">
                <div className="space-y-1">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Official Rating</p>
                  <p className="text-2xl font-black text-white">Tier-1 Contractor</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}