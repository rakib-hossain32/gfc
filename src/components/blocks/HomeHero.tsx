import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Compass,
  ShieldCheck,
  Award
} from 'lucide-react';


export function HomeHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center selection:bg-primary/30">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-accent/2 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />
      
      {/* Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container px-4 md:px-6 mx-auto py-20 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* CONTENT SIDE */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12 min-w-0">
            
            <div className="space-y-5 md:space-y-8">
              {/* Tag */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 group"
              >
                <div className="h-px w-8 sm:w-12 bg-primary group-hover:w-16 transition-all duration-500" />
                <span className="text-primary font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[9px] sm:text-[10px]">
                  Established 2025 • Saudi Arabia
                </span>
              </motion.div>

              {/* Title */}
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-1"
                >
                  <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-accent leading-[0.85] tracking-tighter uppercase">
                    Building
                  </h1>
                  <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-primary leading-[0.85] tracking-tight italic lowercase font-serif pl-2 sm:pl-4 md:pl-6">
                    Excellence.
                  </h1>
                </motion.div>
                <div className="absolute -top-10 -right-8 hidden xl:block opacity-10">
                  <Award className="size-28 text-accent rotate-12" />
                </div>
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-lg md:text-xl text-accent/70 max-w-full sm:max-w-xl leading-relaxed font-medium pr-2"
              >
                Golden First Contracting elevates the standard of 
                <span className="text-accent font-bold"> facility management </span> 
                and construction through precision engineering and an unwavering commitment to quality.
              </motion.p>
            </div>

            {/* Mobile Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:hidden relative w-full pb-2 overflow-hidden"
            >
              <div className="flex gap-2 w-full">
                {/* Left — tall */}
                <div className="relative flex-3 h-48 rounded-xl overflow-hidden shadow-lg min-w-0">
                  <Image
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?fm=jpg&q=80&w=600&auto=format&fit=crop"
                    alt="Facility"
                    fill
                    sizes="(max-width: 768px) 60vw, 0vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-accent/80 via-accent/10 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Facility</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="h-px w-5 bg-primary mb-1.5" />
                    <p className="text-[7px] font-black tracking-widest text-white/50 uppercase">Prime Assets</p>
                    <h3 className="text-xs font-black text-white leading-tight">FACILITY<br/>EXPERTISE</h3>
                  </div>
                </div>

                {/* Right — two stacked */}
                <div className="flex-2 flex flex-col gap-2 min-w-0">
                  <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop"
                      alt="Engineering"
                      fill
                      sizes="(max-width: 768px) 35vw, 0vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-primary/70 to-accent/60" />
                    <div className="absolute bottom-2 left-2.5">
                      <span className="text-xl font-black text-white leading-none">99<span className="text-xs text-white/60">%</span></span>
                      <p className="text-[7px] font-black text-white/60 uppercase tracking-widest">Precision</p>
                    </div>
                  </div>
                  <div className="relative flex-1 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=400&auto=format&fit=crop"
                      alt="Construction"
                      fill
                      sizes="(max-width: 768px) 35vw, 0vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-accent/70 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 flex items-center gap-1">
                      <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[7px] font-black text-white/70 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat — below images, not overlapping */}
              <div className="mt-3 flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-md border border-slate-100 w-fit">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="size-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[7px] font-black text-accent/40 uppercase tracking-widest">Reliability</p>
                  <p className="text-[11px] font-black text-accent">Top Tier Standards</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-3 mt-6 lg:mt-0"
            >
              <Link href="/contact">
                <Button className="h-10 sm:h-12 px-5 sm:px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-lg shadow-primary/20 group whitespace-nowrap">
                  Initiate Project
                  <ArrowRight className="ml-2 size-3.5 sm:size-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button variant="outline" className="h-10 sm:h-12 px-5 sm:px-10 rounded-full border-2 border-accent/20 text-accent hover:bg-accent hover:text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all whitespace-nowrap">
                  The Portfolio
                </Button>
              </Link>
            </motion.div>

            {/* Micro Stats */}
            {/* <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col xs:flex-row items-start xs:items-center gap-5 sm:gap-8 pt-6 sm:pt-10 border-t border-accent/5"
            >
              <div className="flex -space-x-3 sm:-space-x-4">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop"
                ].map((src, i) => (
                  <motion.div 
                    whileHover={{ y: -8, zIndex: 50 }}
                    key={i} 
                    className="size-10 sm:size-12 md:size-14 rounded-full border-4 border-white overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer shadow-xl bg-accent/10"
                  >
                    <Image 
                      src={src} 
                      alt="Executive Partner" 
                      width={56}
                      height={56}
                      className="w-full h-full object-cover scale-110" 
                    />
                  </motion.div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 sm:size-4 text-primary" />
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent">Top Tier Reliability</p>
                </div>
                <p className="text-[8px] sm:text-[9px] text-accent/40 font-bold uppercase tracking-widest">Global Partner Network</p>
              </div>
            </motion.div> */}
          </div>

          {/* VISUAL COMPOSITION SIDE — desktop only */}
          <div className="lg:col-span-5 relative h-125 xl:h-150 hidden lg:flex items-center justify-center">
            
            <motion.div 
              animate={{ x: mousePos.x, y: mousePos.y }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Main Image */}
              <motion.div 
                className="absolute w-64 xl:w-80 h-110 xl:h-130 bg-accent shadow-[40px_40px_80px_rgba(0,0,0,0.2)] overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0% 100%)' }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
                  alt="Riyadh Corporate District"
                  fill
                  sizes="(max-width: 1023px) 0vw, 25vw"
                  className="object-cover opacity-90 transition-transform duration-[3s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-accent via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-14 left-6 xl:left-8 text-white">
                  <div className="h-0.5 w-8 xl:w-10 bg-primary mb-4" />
                  <p className="text-[9px] font-black tracking-[0.4em] opacity-50 uppercase mb-2">Prime Assets</p>
                  <h3 className="text-2xl xl:text-3xl font-black tracking-tighter leading-none">FACILITY <br/>EXPERTISE</h3>
                </div>
              </motion.div>

              {/* Overlapping Block */}
              <motion.div 
                animate={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
                className="absolute -left-10 xl:-left-16 top-20 xl:top-24 w-56 xl:w-72 h-64 xl:h-80 bg-primary shadow-3xl overflow-hidden group"
                style={{ clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 88%)' }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                  alt="Engineering Precision"
                  fill
                  sizes="(max-width: 1023px) 0vw, 22vw"
                  className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-between z-10">
                  <div className="bg-white/10 backdrop-blur-md size-10 xl:size-12 flex items-center justify-center rounded-full border border-white/20">
                    <Compass className="size-5 xl:size-6 text-white" />
                  </div>
                  <div className="text-white">
                    <div className="text-4xl xl:text-5xl font-black leading-none tracking-tighter">99<span className="text-xl xl:text-2xl text-white/50">%</span></div>
                    <div className="text-[10px] font-black opacity-90 uppercase tracking-[0.2em] mt-2 xl:mt-3">Precision Engineering</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Indicator */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 xl:-right-8 bottom-28 xl:bottom-36 bg-white px-6 xl:px-10 py-5 xl:py-8 shadow-[30px_30px_80px_rgba(0,0,0,0.12)] border-t-4 border-primary z-30"
              >
                <div className="flex items-center gap-3 xl:gap-5">
                  <div className="p-3 xl:p-4 bg-accent/5 rounded-2xl">
                    <TrendingUp className="size-5 xl:size-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-accent/30 uppercase tracking-[0.2em]">Efficiency</span>
                    <span className="text-xl xl:text-2xl font-black text-accent tracking-tighter">+24.8%</span>
                  </div>
                </div>
              </motion.div>

              {/* Frame Decor */}
              <div className="absolute top-0 right-0 w-40 xl:w-48 h-40 xl:h-48 border-[0.5px] border-accent/10 -z-10 translate-x-8 xl:translate-x-10 -translate-y-8 xl:-translate-y-10" />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute right-12 bottom-32 hidden xl:block overflow-hidden h-72">
        <p className="rotate-90 origin-bottom-right text-[10px] font-black tracking-[1.5em] text-accent/10 uppercase whitespace-nowrap">
          GOLDEN FIRST • RIYADH • VISION 2030
        </p>
      </div>

    </section>
  );
}
