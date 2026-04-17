"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Globe,
  Zap,
  Building2,
  Boxes} from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { SectionHeader } from "@/src/components/ui/section-header";
import { PageHero } from "@/src/components/ui/page-hero";
import { LucideIcon } from "@/src/components/ui/LucideIcon";

interface ServiceItem {
  name: string;
  icon: string;
  desc: string;
  tag: string;
}

interface ServiceCategory {
  _id: string;
  category: string;
  badge: string;
  description: string;
  items: ServiceItem[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export function ServicesClient() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-white text-sans overflow-hidden">
      <PageHero 
        badge="Full-Scale Capacity"
        title="Operational"
        highlight="Excellence."
        description="We engineer multi-disciplinary solutions that power Saudi Arabia's infrastructure. Our capacity scales from individual units to national gateways."
        watermark="GFC"
        centered
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />

      {/* --- SERVICES CONTENT --- */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 size-200 bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-150 bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          {loading ? (
             <div className="min-h-100 flex flex-col items-center justify-center gap-6">
                <div className="size-20 rounded-full border-4 border-slate-100 border-t-primary animate-spin" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Initializing Protocols...</p>
             </div>
          ) : services.length === 0 ? (
             <div className="min-h-100 flex flex-col items-center justify-center text-center space-y-6">
                <div className="size-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                   <Boxes className="size-10" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-accent italic uppercase tracking-tighter">No Service Nodes Found</h3>
                   <p className="text-slate-400 font-medium max-w-sm mt-2">Manage institutional capabilities through the admin control panel.</p>
                </div>
             </div>
          ) : (
            <div className="space-y-32">
              {services.map((group) => (group.items && group.items.length > 0) && (
                <div key={group._id} className="space-y-12">
                   <SectionHeader 
                     badge={group.badge}
                     title={group.category.split(' ')[0]}
                     highlight={group.category.split(' ').slice(1).join(' ')}
                     description={group.description}
                     align="left"
                   />

                   <motion.div 
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, margin: "-50px" }}
                     className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
                   >
                     {group.items.map((item, i) => (
                       <motion.div
                         key={i}
                         variants={cardVariants}
                         className="group relative h-full"
                       >
                         <div className="h-full bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 p-3 sm:p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden relative">
                            {/* Subtle Card Glow */}
                            <div className="absolute top-0 right-0 size-24 md:size-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-all duration-700 blur-2xl" />

                            <div className="relative space-y-3 sm:space-y-6 md:space-y-8">
                               {/* Icon Box */}
                               <div className="size-9 sm:size-14 md:size-16 rounded-xl md:rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500">
                                  <LucideIcon name={item.icon} className="size-4 sm:size-6 md:size-7 group-hover:-rotate-45 transition-transform" />
                               </div>

                               <div className="space-y-1.5 sm:space-y-4">
                                  <div className="flex items-center gap-2">
                                     <span className="text-[8px] sm:text-[10px] font-black text-primary/40 uppercase tracking-wider px-1.5 sm:px-3 py-0.5 border border-primary/10 rounded-full">
                                        {item.tag}
                                     </span>
                                  </div>
                                  <h3 className="text-xs sm:text-xl md:text-2xl font-black text-accent group-hover:text-primary transition-colors leading-tight">
                                     {item.name}
                                  </h3>
                                  <p className="text-slate-500 text-[11px] sm:text-sm leading-relaxed font-medium hidden sm:block">
                                     {item.desc}
                                  </p>
                               </div>
                            </div>

                            <div className="pt-3 sm:pt-8 md:pt-10 flex items-center justify-between">
                               <Link href={`/services/${item.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-1 sm:gap-3 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-colors group/link">
                                  <span className="hidden sm:inline">Request Specialist</span>
                                  <span className="sm:hidden">View</span>
                                  <ChevronRight className="size-3 sm:size-4 group-hover/link:translate-x-1 transition-transform" />
                               </Link>
                            </div>
                         </div>
                       </motion.div>
                     ))}
                   </motion.div>
                </div>
              ))}
            </div>
          )}

          {/* --- CUSTOM SERVICE CTA --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-accent p-8 sm:p-12 md:p-16 lg:p-24 text-center mt-20 sm:mt-24 md:mt-32"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]" />
            <div className="absolute top-0 right-0 size-100 md:size-125 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
               <div className="size-14 sm:size-16 md:size-20 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto text-primary mb-3 sm:mb-4 shadow-2xl">
                  <Boxes className="size-7 sm:size-8 md:size-10" />
               </div>
               <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter px-4">
                  Require a <span className="text-primary italic font-serif">Bespoke</span> Framework?
               </h2>
               <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium px-4">
                  We engineer custom facility management packages designed for the specific needs of large-scale 
                  corporations, government entities, and private estates.
               </p>
               <div className="pt-2 sm:pt-4">
                  <Button asChild size="lg" className="h-11 md:h-16 px-8 md:px-14 rounded-xl md:rounded-2xl bg-white text-accent hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl font-black uppercase tracking-widest text-[10px]">
                     <Link href="/contact" className="gap-2 sm:gap-3">
                        Discuss Master Agreement <ArrowRight className="size-4 sm:size-5" />
                     </Link>
                  </Button>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BOTTOM LOGO STRIP --- */}
      <section className="py-16 sm:py-20 md:py-24 border-t border-slate-100 flex items-center justify-center gap-8 sm:gap-12 md:gap-16 grayscale px-4">
          <ShieldCheck className="size-6 sm:size-7 md:size-8 text-primary/50" />
          <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-slate-300 rounded-full" />
          <Globe className="size-6 sm:size-7 md:size-8 text-primary/50" />
          <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-slate-300 rounded-full" />
          <Zap className="size-6 sm:size-7 md:size-8 text-primary/50" />
          <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-slate-300 rounded-full" />
          <Building2 className="size-6 sm:size-7 md:size-8 text-primary/50" />
      </section>
    </main>
  );
}
