"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[120px] -z-0 -translate-x-1/2 translate-y-1/2" />
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,#f1f5f9_0.5px,transparent_0.5px),linear-gradient(to_bottom,#f1f5f9_0.5px,transparent_0.5px)] z-0 opacity-40" />

      <div className="max-w-4xl w-full relative z-10 text-center space-y-12">
        {/* Large 404 Text with Glassmorphism */}
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-accent/10 via-accent/5 to-transparent select-none"
          >
            404
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="size-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center p-4 border border-slate-100 overflow-hidden mb-6">
                <Image
                  src="/logo.png"
                  alt="GFC Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-accent tracking-tight">
                Lost in <span className="text-primary italic">Transition?</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
                The page you are looking for has been moved or doesn&#39;t exist in our current infrastructure.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="h-16 px-10 rounded-full bg-accent text-white hover:bg-primary transition-all shadow-xl shadow-accent/10 group">
            <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Home className="size-4" /> Return Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => router.back()}
            className="h-16 px-10 rounded-full border-slate-200 hover:bg-white text-accent transition-all group overflow-hidden relative hover:text-primary cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest relative z-10">
               <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform " /> Go Back
            </div>
            <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Helper Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-12 border-t border-slate-200/60 max-w-sm mx-auto"
        >
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-6 mb-4">Popular Destinations</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/services" className="text-xs font-bold text-accent hover:text-primary transition-colors">Services</Link>
            <Link href="/projects" className="text-xs font-bold text-accent hover:text-primary transition-colors">Projects</Link>
            <Link href="/about" className="text-xs font-bold text-accent hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="text-xs font-bold text-accent hover:text-primary transition-colors">Contact</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
