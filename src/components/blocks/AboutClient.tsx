"use client";

import { motion, Variants } from "framer-motion";
import { 
  Building2, 
  Users, 
  Trophy, 
  History, 
  ShieldCheck, 
  Target, 
  Eye, 
  Compass, 
  Award,
  Globe
} from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/src/components/ui/section-header";

const stats = [
  { label: "Operating Since", value: "2025", icon: History },
  { label: "Completed Projects", value: "N/A", icon: Trophy },
  { label: "Specialized Staff", value: "N/A", icon: Users },
  { label: "Safety Standards", value: "Certified", icon: ShieldCheck },
];

const values = [
  {
    title: "Uncompromising Integrity",
    desc: "We operate with a foundation of transparency, ensuring every corporate interaction is built on absolute trust.",
    icon: ShieldCheck
  },
  {
    title: "Operational Excellence",
    desc: "Golden First Contracting doesn't aim for 'competency'. We engineer perfection into every maintenance and logistics framework we manage.",
    icon: Award
  },
  {
    title: "Futuristic Innovation",
    desc: "Integrating AI-driven maintenance and eco-tech cleaning solutions to stay ahead of Riyadh's evolving landscape.",
    icon: Compass
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

import { PageHero } from "@/src/components/ui/page-hero";

export function AboutClient() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero 
        badge="Quality & Precision"
        title="The Standard"
        highlight="of Saudi Arabia."
        description="Golden First Contracting is the strategic backbone for the nation's most critical infrastructure and corporate estates. Engineering excellence since 2014."
        watermark="GFC"
        centered
        breadcrumb={[{ label: "About", href: "/about" }]}
      />

      {/* --- STATS DASHBOARD --- */}
      <section className="py-12 md:py-24 bg-white relative">
         <div className="container px-4 md:px-6 mx-auto">
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
            >
               {stats.map((stat, i) => (
                  <motion.div 
                     key={i} 
                     variants={itemVariants}
                     className="flex flex-col items-center text-center space-y-3 md:space-y-4 group p-4 md:p-0"
                  >
                     <div className="size-12 md:size-16 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                        <stat.icon className="size-6 md:size-8" />
                     </div>
                     <div>
                        <h4 className="text-2xl md:text-4xl font-black text-accent">{stat.value}</h4>
                        <p className="text-[9px] md:text-[10px] font-bold text-muted uppercase tracking-widest leading-tight mt-1">{stat.label}</p>
                     </div>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 translate-x-1/2 z-0" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <div className="space-y-8 md:space-y-12">
               <SectionHeader 
                 badge="The Identity"
                 title="Our Mission &"
                 highlight="Future Vision."
                 align="left"
                 className="mb-0"
               />
               
               <div className="grid gap-6 md:gap-10 mt-8">
                  <div className="flex gap-4 md:gap-6 group">
                     <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Target className="size-5 md:size-6" />
                     </div>
                     <div className="space-y-2 md:space-y-3">
                        <h4 className="text-lg md:text-xl font-black text-accent">The Mission</h4>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                           To elevate Saudi Arabia&apos;s operational landscape by providing multi-disciplinary services 
                           that integrate global standards with deep-rooted local expertise.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4 md:gap-6 group">
                     <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Eye className="size-5 md:size-6" />
                     </div>
                     <div className="space-y-2 md:space-y-3">
                        <h4 className="text-lg md:text-xl font-black text-accent">The Vision</h4>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                           Becoming the primary infrastructure partner for Saudi Arabia&apos;s National Vision 2030, 
                           driving sustainability and efficiency across every square meter of the nation.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="relative h-64 sm:h-80 md:h-125 rounded-2xl md:rounded-[3rem] overflow-hidden border-4 md:border-12 border-white shadow-2xl"
            >
               <Image 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
                  alt="Boardroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
               />
               <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
         <div className="container px-4 md:px-6 mx-auto">
            <SectionHeader 
               badge="The Code"
               title="Corporate"
               highlight="Core Values."
               description="Our operations are governed by a set of strict ethical and professional principles that ensure consistency and prestige."
               align="center"
            />

            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16"
            >
               {values.map((value, i) => (
                  <motion.div 
                     key={i} 
                     variants={itemVariants}
                     whileHover={{ y: -10 }}
                     className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center space-y-4 md:space-y-6"
                  >
                     <div className="size-12 md:size-16 rounded-2xl md:rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                        <value.icon className="size-6 md:size-8" />
                     </div>
                     <h4 className="text-lg md:text-2xl font-black text-accent">{value.title}</h4>
                     <p className="text-muted text-sm leading-relaxed font-medium">
                        {value.desc}
                     </p>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* --- TRUST FOOTER --- */}
      <section className="py-12 md:py-20 border-t border-slate-100 flex flex-col items-center gap-6 md:gap-10 px-4">
         <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Official Accreditation</p>
         <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 grayscale opacity-30">
            <div className="flex items-center gap-2">
               <ShieldCheck className="size-5 md:size-6 text-accent" />
               <span className="text-xs font-bold font-sans">Quality Certified</span>
            </div>
            <div className="flex items-center gap-2">
               <Globe className="size-5 md:size-6 text-accent" />
               <span className="text-xs font-bold font-sans">GCC REGIONAL</span>
            </div>
            <div className="flex items-center gap-2">
               <Building2 className="size-5 md:size-6 text-accent" />
               <span className="text-xs font-bold font-sans">DP CERTIFIED</span>
            </div>
         </div>
      </section>
    </main>
  );
}
