"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
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
    <section className="pb-12 md:pb-24 bg-white relative overflow-hidden">
      
      {/* Watermark */}
      <div className="absolute top-0 left-0 text-[8rem] md:text-[25rem] font-black text-slate-50 select-none -z-10 leading-none -translate-y-1/2 translate-x-[-10%] opacity-80">
        10
      </div>
      <div className="absolute right-0 top-0 h-full w-px bg-slate-100 hidden xl:block" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          
          {/* LEFT: CONTENT */}
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
              className="mb-6 md:mb-8"
            />

            <motion.div variants={itemVariants} className="pl-4 md:pl-6 border-l-2 border-primary/20 mb-7 md:mb-10">
              <p className="text-muted text-sm md:text-lg leading-relaxed">
                Golden First Contracting isn&apos;t just a provider; we are the infrastructure partners for the nation&apos;s most prestigious institutions. 
                <br className="hidden md:block" /><br className="hidden md:block" />
                <span className="hidden md:inline">From complex facility management to corporate support, we blend </span>
                <span className="md:hidden">We blend </span>
                <span className="text-accent font-semibold">traditional Saudi hospitality</span> with <span className="text-accent font-semibold">global operational standards</span>.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 md:gap-6">
              <Button asChild className="h-11 md:h-14 px-6 md:px-8 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/20">
                <Link href="/about" className="flex items-center gap-2">
                  Our Corporate Profile <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[1,2,3].map(i => (
                    <div key={i} className="size-8 md:size-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                      <Image src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} alt="Client" fill sizes="40px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-accent leading-tight">
                  Trusted by <br /> 500+ Corporations
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: VISUALS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative lg:h-150"
          >
            {/* Main Image */}
            <div className="relative h-56 sm:h-72 md:h-96 lg:h-full w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
                alt="Corporate Meeting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />

              {/* Stats Card — overlaid on image bottom */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-65 md:max-w-70 bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-accent/10">
                  <div>
                    <p className="text-xl md:text-2xl font-black text-primary leading-none">98%</p>
                    <p className="text-[9px] uppercase tracking-widest text-muted font-bold mt-0.5">Client Retention</p>
                  </div>
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="size-3.5 text-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Active Staff", value: "500+" },
                    { label: "Safety Score", value: "100%" },
                    { label: "Projects", value: "1.2k" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-sm font-black text-accent">{s.value}</p>
                      <p className="text-[8px] font-bold text-muted uppercase tracking-wide leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 size-24 border-t-2 border-r-2 border-highlight rounded-tr-3xl -z-10 hidden md:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

