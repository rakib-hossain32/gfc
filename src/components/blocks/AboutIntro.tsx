"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Award, ShieldCheck, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";

export function AboutIntro() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="pb-16 md:pb-24 bg-white relative overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      {/* Massive Watermark Number representing "10 Years" - Subtle Luxury */}
      <div className="absolute top-0 left-0 text-[15rem] md:text-[25rem] font-black text-slate-50 select-none -z-10 leading-none -translate-y-1/2 translate-x-[-10%] opacity-80">
        10
      </div>
      {/* Geometric Line Pattern */}
      <div className="absolute right-0 top-0 h-full w-px bg-slate-100 hidden xl:block" />
      <div className="absolute right-[10%] top-0 h-full w-px bg-slate-100 hidden xl:block" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT COLUMN: CONTENT --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10"
          >
            <SectionHeader 
              badge="Who We Are"
              title="A Decade of"
              highlight="Golden First Contracting Precision."
              align="left"
              className="mb-8"
            />

            <motion.div variants={itemVariants} className="pl-6 border-l-2 border-primary/20 mb-10">
              <p className="text-muted text-lg leading-relaxed">
                Golden First Contracting isn't just a provider; we are the infrastructure partners for the nation's most prestigious institutions. 
                <br /><br />
                From complex facility management to corporate support, we blend <span className="text-accent font-semibold">traditional Saudi Arabiai hospitality</span> with <span className="text-accent font-semibold">global operational standards</span>.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <Button asChild className="h-14 px-8 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/20">
                <Link href="/about">
                  Our Corporate Profile <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="size-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                             <Image src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} alt="Client" fill className="object-cover" />
                        </div>
                    ))}
                 </div>
                 <div className="text-xs font-bold text-accent">
                    Trusted by <br /> 500+ Corporations
                 </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: VISUALS --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Smooth architectural ease
            viewport={{ once: true }}
            className="relative lg:h-[600px]"
          >
            {/* Main Image with sophisticated masking */}
            <div className="relative h-[400px] lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
               <Image
                 src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" // Professional boardroom/office shot
                 alt="Corporate Meeting"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
            </div>

            {/* Floating "Glass" Stats Card - Overlapping effect */}
            <motion.div 
               initial={{ y: 40, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="absolute -bottom-10 -left-6 md:-left-12 bg-white/80 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-w-[calc(100%-2rem)] md:max-w-sm"
            >
               <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-accent/10 pb-4">
                     <div>
                        <p className="text-3xl font-black text-primary">98%</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted font-bold">Client Retention</p>
                     </div>
                     <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="size-5 text-primary" />
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <StatRow label="Active Staff" value="500+" />
                     <StatRow label="Safety Score" value="100%" />
                     <StatRow label="Projects Done" value="1.2k" />
                  </div>
               </div>
            </motion.div>

            {/* Decorative Gold Square */}
            <div className="absolute -top-4 -right-4 size-24 border-t-2 border-r-2 border-highlight rounded-tr-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Micro-component for the stats card
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
       <span className="text-sm font-medium text-muted">{label}</span>
       <span className="text-sm font-black text-accent">{value}</span>
    </div>
  )
}