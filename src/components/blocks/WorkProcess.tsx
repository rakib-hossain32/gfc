"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { 
  Search, 
  ClipboardCheck, 
  Settings, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";

const steps = [
  { 
    title: "Consultation", 
    desc: "We begin with an expert on-site assessment to understand your unique facility requirements.", 
    icon: Search,
    tag: "Deep Analysis" 
  },
  { 
    title: "Strategic Plan", 
    desc: "Our engineers develop a bespoke roadmap with precise timelines and resource allocation.", 
    icon: ClipboardCheck,
    tag: "Custom Layout"
  },
  { 
    title: "Execution", 
    desc: "Deployment of our highly-skilled, vetted specialists to bring the plan to life flawlessly.", 
    icon: Settings,
    tag: "Precision Work"
  },
  { 
    title: "Quality Audit", 
    desc: "A rigorous final inspection ensuring every detail meets or exceeds Saudi national standards.", 
    icon: CheckCircle2,
    tag: "Certification"
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

export function WorkProcess() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 size-96 bg-accent/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionHeader 
          badge="Efficiency Redefined"
          title="Our Formula for"
          highlight="Golden First Contracting Protocol"
          description="A seamless, four-step transformation process designed for institutional scalability and local precision."
          align="center"
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8 lg:gap-12 relative"
        >
          {/* Horizontal Connection Line (Desktop) */}
          <div className="absolute top-16 left-10 right-10 h-px bg-slate-100 hidden lg:block -z-10">
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-linear-to-r from-primary/50 via-primary to-primary/50" 
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-5 bg-white border border-slate-100 shadow-sm px-2.5 md:px-4 py-0.5 md:py-1 rounded-full z-20 group-hover:border-primary/30 transition-colors">
                <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em]">Step 0{index + 1}</span>
              </div>
              
              {/* Icon Container */}
              <div className="relative size-28 md:size-48 flex items-center justify-center mb-4 md:mb-10">
                 <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 blur-xl" />
                 <div className="absolute inset-0 border border-slate-100 rounded-full group-hover:border-primary/20 group-hover:scale-110 transition-all duration-500" />
                 <div className="size-14 md:size-24 rounded-2xl md:rounded-4xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-slate-50 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all duration-500 relative z-10">
                    <step.icon className="size-6 md:size-10" />
                 </div>
                 {index !== steps.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:flex items-center justify-center size-8 rounded-full bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white transition-all duration-500 z-20 border border-white">
                        <ArrowRight className="size-4" />
                    </div>
                 )}
              </div>
              
              <div className="space-y-1.5 md:space-y-4 px-1 md:px-4">
                <div>
                   <span className="text-[8px] md:text-[10px] font-bold text-primary uppercase tracking-widest">{step.tag}</span>
                   <h3 className="text-sm md:text-2xl font-black text-accent mt-0.5 md:mt-1 group-hover:text-primary transition-colors leading-tight">{step.title}</h3>
                </div>
                <p className="text-[11px] md:text-sm font-medium text-muted leading-relaxed hidden sm:block">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- BOTTOM SUMMARY --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 md:mt-24 py-6 md:py-8 px-5 md:px-12 rounded-2xl md:rounded-4xl bg-slate-50/50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5 md:gap-8 text-center sm:text-left"
        >
            <div className="flex items-center gap-4 md:gap-6">
                <div className="size-10 md:size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="size-5 md:size-6" />
                </div>
                <div>
                    <p className="font-bold text-accent text-sm md:text-base">Continuous Optimization</p>
                    <p className="text-xs text-muted">Our process includes post-delivery support and ongoing refinement.</p>
                </div>
            </div>
            <div className="flex -space-x-3 shrink-0">
               {[1,2,3,4].map(i => (
                  <div key={i} className="size-9 md:size-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                     <Image src={`https://randomuser.me/api/portraits/men/${i+40}.jpg`} alt="Worker" fill className="object-cover" />
                  </div>
               ))}
               <div className="size-9 md:size-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white">
                  +500
               </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
