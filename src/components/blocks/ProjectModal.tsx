"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  MapPin, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Loader2 
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProjectModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

export function ProjectModal({ project, isOpen, onClose, isLoading }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery.length - 1 : prev - 1
      );
    }
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl bg-white sm:rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button 
             onClick={onClose}
             className="absolute top-4 right-4 size-10 sm:size-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all z-60 group"
          >
             <X className="size-5 sm:size-6 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="flex flex-col lg:flex-row h-full w-full">
            {isLoading ? (
              <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center p-20 gap-4 bg-slate-50/50">
                <div className="relative">
                  <Loader2 className="size-14 animate-spin text-primary/20" />
                  <Loader2 className="size-14 animate-spin text-primary absolute inset-0 [animation-duration:1.5s]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/40 animate-pulse">Initializing</p>
                  <p className="text-xs font-bold text-accent italic">Project Intelligence</p>
                </div>
              </div>
            ) : (
              <>
                {/* Left: Responsive Gallery */}
                <div className="relative w-full lg:w-3/5 h-[40vh] sm:h-[50vh] lg:h-auto flex flex-col bg-slate-950 shrink-0 overflow-hidden">
                   <div className="relative flex-1">
                      <AnimatePresence mode="wait">
                         <motion.div 
                            key={currentImageIndex}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                         >
                            <Image 
                               src={project.gallery[currentImageIndex]} 
                               alt="Gallery" fill className="object-cover" priority
                            />
                         </motion.div>
                      </AnimatePresence>
                      
                      {project.gallery.length > 1 && (
                         <>
                            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all z-20">
                               <ChevronLeft className="size-6" />
                            </button>
                            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all z-20">
                               <ChevronRight className="size-6" />
                            </button>
                         </>
                      )}
                   </div>

                   {/* Thumbnails */}
                   <div className="flex gap-2 p-4 bg-black/20 overflow-x-auto scrollbar-hide shrink-0">
                      {project.gallery.map((img: any, i: number) => (
                         <button 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)} 
                            className={`relative size-12 sm:size-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${i === currentImageIndex ? 'border-primary' : 'border-transparent opacity-50'}`}
                         >
                            <Image src={img} alt="Thumb" fill className="object-cover" />
                         </button>
                      ))}
                   </div>
                </div>

                {/* Right: Content details */}
                <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
                   <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 scrollbar-hide">
                      <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{project.category}</span>
                         </div>
                         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-accent uppercase tracking-tighter leading-tight italic">{project.title}</h2>
                         <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                            {project.desc || "Comprehensive facility management excellence delivered at the highest tier in Saudi Arabia's most iconic locations."}
                         </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-5 rounded-4xl bg-slate-50 border border-slate-100">
                         {[
                            { label: "Location", value: project.location, icon: MapPin },
                            { label: "Metric", value: project.stats, icon: Layers },
                            { label: "Completion", value: "Q4 2024", icon: Calendar },
                            { label: "Status", value: project.status, icon: CheckCircle2 }
                         ].map((stat, i) => (
                            <div key={i} className="space-y-0.5">
                               <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                               <p className="text-xs sm:text-sm font-bold text-accent truncate flex items-center gap-2">
                                  <stat.icon className="size-3 text-primary shrink-0" /> {stat.value}
                               </p>
                            </div>
                         ))}
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-accent border-b border-slate-100 pb-4">Operational Performance</h4>
                         <div className="grid grid-cols-1 gap-3">
                            {["Certified Quality Maintenance", "24/7 Priority Support", "Master Technical Personnel", "Sustainable Resource Optimization"].map((item, i) => (
                               <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                  <div className="size-1.5 rounded-full bg-primary" /> {item}
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 shrink-0">
                      <Button asChild className="w-full h-11 rounded-2xl bg-accent hover:bg-primary shadow-xl shadow-accent/10 transition-all font-black uppercase tracking-[0.2em] text-[10px]">
                         <Link href="/contact" className="gap-2">Request Technical Briefing <Zap className="size-4" /></Link>
                      </Button>
                   </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
