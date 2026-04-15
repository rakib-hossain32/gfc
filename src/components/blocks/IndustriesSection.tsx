"use client";

import { motion, Variants } from "framer-motion";
import { 
  Building2, 
  Home, 
  Construction, 
  Factory, 
  Landmark, 
  Monitor,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";
import Link from "next/link";

const industries = [
  { 
    name: "Residential", 
    icon: Home, 
    desc: "Luxury villas and high-end residential complexes across Riyadh.",
    link: "/industries/residential",
    tag: "Luxury Living"
  },
  { 
    name: "Commercial", 
    icon: Building2, 
    desc: "Modern office towers, retail malls, and corporate headquarters.",
    link: "/industries/commercial",
    tag: "Business Hubs"
  },
  { 
    name: "Industrial", 
    icon: Factory, 
    desc: "Critical support for Oil, gas, and large scale manufacturing plants.",
    link: "/industries/industrial",
    tag: "Global Energy"
  },
  { 
    name: "Public Sector", 
    icon: Landmark, 
    desc: "Official government buildings and world-class educational institutions.",
    link: "/industries/public-sector",
    tag: "Institutional"
  },
  { 
    name: "Construction", 
    icon: Construction, 
    desc: "Strategic infrastructure and sustainable urban development projects.",
    link: "/industries/construction",
    tag: "Urban Growth"
  },
  { 
    name: "Tech Spaces", 
    icon: Monitor, 
    desc: "Mission-critical data centers and intelligent smart facilities.",
    link: "/industries/tech-spaces",
    tag: "Innovation"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export function IndustriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionHeader 
          badge="Sectors of Impact"
          title="Specialized in"
          highlight="Diverse Industries."
          description="Golden First Contracting's expertise spans the most critical sectors of Saudi Arabia's economy, ensuring excellence and reliability in every specialized niche."
          align="center"
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={item.link} className="block relative h-72 rounded-4xl border border-slate-100 bg-slate-50/30 p-8 transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                
                {/* Floating Action Button Design */}
                <div className="absolute top-8 right-8 size-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
                   <ArrowUpRight className="size-5" />
                </div>

                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="size-7" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{item.tag}</span>
                      <h3 className="text-2xl font-black text-accent mt-1">{item.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-muted leading-relaxed max-w-[85%] group-hover:text-accent transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* Decorative Pattern on Card */}
                <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                   <item.icon className="size-32" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* --- BOTTOM CTA --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 flex flex-col items-center gap-6"
        >
            <div className="h-10 w-px bg-slate-200" />
            <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                <Plus className="size-4 text-primary" />
                Custom Industry Solutions Available
            </p>
        </motion.div>
      </div>
    </section>
  );
}
