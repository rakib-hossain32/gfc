"use client";

import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Trophy, 
  ChevronRight, 
  CheckCircle2, 
  Stars,
  Award,
  BarChart3
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SectionHeader } from "@/src/components/ui/section-header";
import Link from "next/link";
import Image from "next/image";

const reasons = [
  {
    title: "Unmatched Reliability",
    desc: "24/7 dedicated support and rapid response teams for urgent corporate needs in Riyadh.",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "DP Expertise",
    desc: "100+ high-skilled technicians specifically trained for niche industrial environments.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Bespoke Solutions",
    desc: "Tailored monthly maintenance packages that scale seamlessly with your corporate growth.",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Global Standards",
    desc: "ISO Certified processes adapted for the unique and demanding Saudi landscape.",
    icon: Trophy,
    color: "text-rose-600",
    bg: "bg-rose-50"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 size-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: CONTENT --- */}
          <div className="space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <SectionHeader 
              badge="The Advantage"
              title="Why Industry Leaders"
              highlight="Exclusively Trust Us?"
              description="We define the benchmark for Golden First Contracting excellence. From luxury towers to heavy industrial zones, our presence ensures peak operational performance and safety."
              align="left"
              className="mb-0 md:items-start md:text-left text-center"
            />

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 gap-8"
            >
              {reasons.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="group flex gap-5"
                >
                  <div className={`shrink-0 size-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-accent group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-xs font-medium text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop CTA Button - Hidden on mobile/tablet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="hidden lg:flex flex-wrap items-center gap-6 pt-4"
            >
              <Button asChild size="lg" className="h-16 px-10 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-xl shadow-accent/10">
                <Link href="/contact" className="flex items-center gap-2 uppercase tracking-widest font-bold text-xs">
                  Partner with Us <ChevronRight className="size-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-muted animate-pulse">
                <CheckCircle2 className="size-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">ISO 9001:2015 Certified</span>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: PREMIUM VISUAL DASHBOARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            {/* Main Image Layer - Shorter on tablet */}
            <div className="relative aspect-4/5 md:aspect-video lg:aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200">

               <Image 
                 src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
                 alt="Premium Corporate Building"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
               <div className="absolute inset-0 bg-linear-to-t from-accent/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Stats Card */}
            <motion.div 
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 max-w-[280px]"
            >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <Award className="size-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-accent leading-none">A+</p>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Corporate Rating</p>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-muted uppercase">Retention</span>
                      <span className="text-xl font-black text-primary">99.2%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: "99.2%" }}
                         transition={{ duration: 1.5, delay: 1 }}
                         className="h-full bg-primary" 
                       />
                    </div>
                  </div>
                </div>
            </motion.div>

            {/* Top Floating Badge */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4"
            >
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <BarChart3 className="size-5" />
              </div>
              <div>
                <p className="text-lg font-black text-accent leading-none">12+ Years</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-tight">Market Expertise</p>
              </div>
            </motion.div>

            {/* Decorative Geometric Elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 size-48 border-2 border-primary/20 rounded-full" />
            <div className="absolute -z-10 -bottom-14 -right-14 size-48 border-2 border-accent/5 rounded-full" />
          </motion.div>

        </div>

        {/* --- MOBILE CTA BUTTON --- */}
        {/* Visible only on mobile/tablet, appears after the image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex lg:hidden flex-col sm:flex-row items-center gap-6 mt-12 pt-8 border-t border-slate-100"
        >
          <Button asChild size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-xl shadow-accent/10">
            <Link href="/contact" className="flex items-center justify-center gap-2 uppercase tracking-widest font-bold text-xs">
              Partner with Us <ChevronRight className="size-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-muted animate-pulse">
            <CheckCircle2 className="size-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">ISO 9001:2015 Certified</span>
          </div>
        </motion.div>
      </div>
    </section>

  );
}
