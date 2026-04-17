"use client";

import { motion, Variants } from "framer-motion";
import { 
  Wrench, 
  Zap, 
  HardHat, 
  Truck, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Clock,
  ChevronRight,
  Droplets,
  Settings,
  Paintbrush,
  Users,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { SectionHeader } from "@/src/components/ui/section-header";

import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  Building2, 
  Zap, 
  HardHat, 
  Truck, 
  Wrench, 
  Droplets, 
  Settings, 
  Paintbrush, 
  Users, 
  ShieldAlert,
  ShieldCheck,
  Clock
};

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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function ServicesSection() {
  const [servicesData, setServicesData] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServicesData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const count = servicesData.length;
  const gridCols =
    count === 1 ? "grid-cols-1" :
    count === 2 ? "grid-cols-2" :
    count === 3 ? "grid-cols-2 lg:grid-cols-3" :
    "grid-cols-2 xl:grid-cols-4";

  return (
    <section id="services" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        <SectionHeader 
          badge="Our Expertise"
          title="Precision Services for"
          highlight="Golden First Contracting Excellence."
          description="Deploying global standards across Saudi Arabia's evolving landscape. We provide integrated solutions that empower businesses and enhance urban living."
          align="center"
        />

        {/* --- SERVICES GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid ${gridCols} gap-6 md:gap-8`}
        >
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-100 rounded-3xl bg-slate-50 animate-pulse border border-slate-100" />
            ))
          ) : (
            servicesData.map((service, index) => {
              // Try to find an icon from map, default to Building2
              const IconComponent = iconMap[service.items?.[0]?.icon] || Building2;
              const link = `/services#${service.category.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <motion.div
                  key={service._id}
                  variants={cardVariants}
                  className="group relative h-full"
                >
                  <div className="h-full bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-primary/20 p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden">
                    
                    {/* Background Accent Circle */}
                    <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 blur-2xl" />

                    <div className="relative space-y-4 md:space-y-8">
                      {/* Icon */}
                      <div className="relative size-11 md:size-16">
                        <div className="absolute inset-0 bg-primary/10 rounded-xl md:rounded-2xl group-hover:rotate-45 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center text-primary">
                          <IconComponent className="size-5 md:size-8" />
                        </div>
                      </div>

                      <div className="space-y-2 md:space-y-4">
                        <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-full inline-block">
                          {service.badge}
                        </span>
                        <h3 className="text-base md:text-2xl font-black text-accent group-hover:text-primary transition-colors leading-tight">
                          {service.category}
                        </h3>
                        <p className="text-muted text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 md:pt-10 flex items-center justify-between mt-auto">
                      <Link 
                        href={link}
                        className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors group/link"
                      >
                        View <ChevronRight className="size-3 md:size-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-2xl md:text-4xl font-black text-slate-100 group-hover:text-primary/5 transition-colors select-none">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* --- FOOTER CTA --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-20 pt-10 md:pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center -space-x-2">
               <ShieldCheck className="size-8 md:size-10 text-primary" />
               <Clock className="size-8 md:size-10 text-accent/20" />
            </div>
            <div>
              <p className="font-bold text-accent text-base md:text-lg">Certified Quality Standards</p>
              <p className="text-xs md:text-sm text-muted">Averaging 24/7 support reliability across all sectors.</p>
            </div>
          </div>
          <Button asChild className="w-full md:w-auto h-11 md:h-16 px-8 md:px-10 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 text-xs">
            <Link href="/services" className="flex items-center justify-center gap-2">
              Browse All Capabilities <ArrowRight className="size-4 md:size-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
