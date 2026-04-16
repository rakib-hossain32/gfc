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
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-accent/2 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute top-[-10%] left-[-5%] w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />
      
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* CONTENT SIDE */}
          <div className="lg:col-span-7 space-y-14">
            
            <div className="space-y-8">
              {/* Refined Established Tag */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-4 group"
              >
                <div className="h-px w-12 bg-primary group-hover:w-20 transition-all duration-500" />
                <span className="text-primary font-black tracking-[0.5em] uppercase text-[10px] sm:text-xs">
                  Established 2014 • Saudi Arabia
                </span>
              </motion.div>

              {/* Expensive Typography for Title */}
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-2"
                >
                  <h1 className="text-7xl md:text-9xl font-black text-accent leading-[0.8] tracking-tighter uppercase">
                    Building
                  </h1>
                  <h1 className="text-7xl md:text-9xl font-light text-primary leading-[0.8] tracking-tight italic lowercase font-serif pl-2 md:pl-6">
                    Excellence.
                  </h1>
                </motion.div>
                <div className="absolute -top-12 -right-12 hidden xl:block opacity-10">
                  <Award className="size-32 text-accent rotate-12" />
                </div>
              </div>

              {/* Refined Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-accent/70 max-w-xl leading-relaxed font-medium"
              >
                Golden First Contracting elevates the standard of 
                <span className="text-accent font-bold"> facility management </span> 
                and construction through precision engineering and an unwavering commitment to quality.
              </motion.p>
            </div>

            {/* Premium CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 group">
                  Initiate Project
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/projects">
                <Button variant="outline" className="h-14 px-10 rounded-full border-2 border-accent/20 text-accent hover:bg-accent hover:text-white font-bold text-sm uppercase tracking-wider transition-all">
                  The Portfolio
                </Button>
              </Link>
            </motion.div>

            {/* Corporate Micro Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-8 pt-10 border-t border-accent/5"
            >
              <div className="flex -space-x-4">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop"
                ].map((src, i) => (
                  <motion.div 
                    whileHover={{ y: -8, zIndex: 50, filter: 'grayscale(0%)' }}
                    key={i} 
                    className="size-14 rounded-full border-4 border-secondary overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer shadow-xl bg-accent/10"
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
                  <ShieldCheck className="size-4 text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">Top Tier Reliability</p>
                </div>
                <p className="text-[9px] text-accent/40 font-bold uppercase tracking-widest">Global Partner Network</p>
              </div>
            </motion.div>
          </div>

          {/* VISUAL COMPOSITION SIDE */}
          <div className="lg:col-span-5 relative h-187.5 hidden lg:flex items-center justify-center">
            
            <motion.div 
              animate={{ x: mousePos.x, y: mousePos.y }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Main Architectural Feature */}
              <motion.div 
                className="absolute w-80 h-137.5 bg-accent shadow-[60px_60px_100px_rgba(0,0,0,0.2)] overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0% 100%)' }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2F1ZGklMjBhcmFiaWElMjBjaXR5fGVufDB8fDB8fHww" 
                  alt="Riyadh Corporate District"
                  fill
                  className="object-cover opacity-90 transition-transform duration-[3s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-accent via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-16 left-8 text-white">
                  <div className="h-0.5 w-10 bg-primary mb-5" />
                  <p className="text-[9px] font-black tracking-[0.4em] opacity-50 uppercase mb-2">Prime Assets</p>
                  <h3 className="text-3xl font-black tracking-tighter leading-none">FACILITY <br/>EXPERTISE</h3>
                </div>
              </motion.div>

              {/* Fixed Overlapping Image (Precision/99% Block) */}
              <motion.div 
                animate={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
                className="absolute -left-16 top-24 w-72 h-80 bg-primary shadow-3xl overflow-hidden group"
                style={{ clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 88%)' }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                  alt="Engineering Precision"
                  fill
                  className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="bg-white/10 backdrop-blur-md size-12 flex items-center justify-center rounded-full border border-white/20">
                    <Compass className="size-6 text-white" />
                  </div>
                  <div className="text-white">
                    <div className="text-5xl font-black leading-none tracking-tighter">99<span className="text-2xl text-white/50">%</span></div>
                    <div className="text-[10px] font-black opacity-90 uppercase tracking-[0.2em] mt-3">Precision Engineering</div>
                  </div>
                </div>
              </motion.div>

              {/* Sophisticated Floating Indicator */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-36 bg-white px-10 py-8 shadow-[30px_30px_80px_rgba(0,0,0,0.12)] border-t-4 border-primary z-30"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-accent/5 rounded-2xl">
                    <TrendingUp className="size-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-accent/30 uppercase tracking-[0.2em]">Efficiency</span>
                    <span className="text-2xl font-black text-accent tracking-tighter">+24.8%</span>
                  </div>
                </div>
              </motion.div>

              {/* Architectural Frame Decor */}
              <div className="absolute top-0 right-0 w-48 h-48 border-[0.5px] border-accent/10 -z-10 translate-x-10 -translate-y-10" />
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
