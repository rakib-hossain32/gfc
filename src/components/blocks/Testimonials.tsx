"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence,  } from "framer-motion";
import Image from "next/image";
import {
  Star,
  Quote,
  X,
  MessageSquarePlus,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";

export function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // How many cards per "page" based on screen
  const CARDS_PER_PAGE = 2;

  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
  const visibleReviews = reviews.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const fetchApprovedReviews = async () => {
    try {
      const res = await fetch(`/api/testimonials?status=approved&page=1&limit=50`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    if (totalPages <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentPage(p => (p + 1) % totalPages);
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [totalPages]);

  const goTo = (idx: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentPage(idx);
  };

  const prev = () => goTo((currentPage - 1 + totalPages) % totalPages);
  const next = () => goTo((currentPage + 1) % totalPages);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", role: "", content: "", rating: 5 });
        setTimeout(() => { setIsSubmitted(false); setIsModalOpen(false); }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={cn("py-16 md:py-24 bg-slate-50 relative overflow-hidden", isModalOpen ? "z-50" : "z-10")}>
      <div className="absolute top-0 left-0 w-full h-125 bg-linear-to-b from-white to-transparent" />
      <div className="absolute top-[20%] right-[-10%] size-96 bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <SectionHeader
          badge="Voice of Success"
          title="Trusted by"
          highlight="Golden First Contracting"
          description="Real testimonials from the leaders shaping Saudi Arabia's most iconic landscapes and infrastructures."
          align="center"
          className="mb-0 text-center"
        />

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-8 text-primary animate-spin" /></div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Institutional feedback repository is being updated.</p>
            <button onClick={() => setIsModalOpen(true)} className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline">Be the first to share your experience</button>
          </div>
        ) : (
          <div className="relative mt-12 md:mt-16">
            {/* Cards — 2 per row always */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-3 md:gap-8"
              >
                {visibleReviews.map((item, index) => (
                  <div
                    key={index}
                    className="group relative p-4 md:p-10 rounded-2xl md:rounded-4xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    <div className="absolute top-4 right-4 md:top-10 md:right-10 size-8 md:size-12 text-primary/5 group-hover:text-primary transition-colors duration-500">
                      <Quote className="size-full fill-current" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-6">
                      {[...Array(item.rating)].map((_: unknown, i: number) => (
                        <Star key={i} className="size-2.5 md:size-3.5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-accent text-[11px] md:text-base font-medium leading-relaxed mb-4 md:mb-8 line-clamp-4 md:line-clamp-none flex-1">
                      &ldquo;{item.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 md:gap-4 pt-3 md:pt-8 border-t border-slate-50">
                      <div className="relative size-8 md:size-12 rounded-full overflow-hidden border border-slate-100 shrink-0">
                        <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-accent text-xs md:text-sm group-hover:text-primary transition-colors truncate">{item.name}</h4>
                        <p className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-widest truncate">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
                <button
                  onClick={prev}
                  className="size-9 md:size-10 rounded-full border border-slate-200 flex items-center justify-center text-accent hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === currentPage ? "w-6 h-2 bg-primary" : "size-2 bg-slate-200 hover:bg-slate-300"
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="size-9 md:size-10 rounded-full border border-slate-200 flex items-center justify-center text-accent hover:border-primary hover:text-primary transition-all"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 flex flex-col items-center gap-4 md:gap-6"
        >
          <div className="h-10 md:h-12 w-px bg-linear-to-b from-primary/30 to-transparent" />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-11 md:h-16 px-8 md:px-10 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/10 group"
          >
            <span className="flex items-center gap-2 md:gap-3 text-xs font-bold uppercase tracking-widest">
              Share Your Experience <MessageSquarePlus className="size-4 md:size-5" />
            </span>
          </Button>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Join the leaders of Saudi Arabia</p>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl bg-white rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 md:top-8 md:right-8 size-9 md:size-10 rounded-full bg-slate-50 flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all shadow-sm z-10"
                >
                  <X className="size-4 md:size-5" />
                </button>

                <div className="p-6 md:p-12">
                  {!isSubmitted ? (
                    <div className="space-y-6 md:space-y-10">
                      <div className="space-y-2 md:space-y-4">
                        <h3 className="text-xl md:text-3xl font-black text-accent">Submit a <span className="text-primary italic font-serif">Review.</span></h3>
                        <p className="text-muted text-xs md:text-sm font-medium">Your feedback drives our pursuit of operational excellence.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Full Name</label>
                            <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Ahmed Khalid" required className="h-11 md:h-14 rounded-xl border-slate-100 focus:ring-primary/20 font-bold" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Professional Role</label>
                            <Input value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="Property Manager" required className="h-11 md:h-14 rounded-xl border-slate-100 focus:ring-primary/20 font-bold" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Your Experience</label>
                          <Textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} placeholder="Share details about our performance..." required className="min-h-28 md:min-h-35 rounded-2xl border-slate-100 focus:ring-primary/20 p-4 font-bold" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Overall Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} type="button" onClick={() => setFormData({...formData, rating: s})}
                                className={cn("size-9 md:size-10 rounded-xl flex items-center justify-center transition-all", formData.rating >= s ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-300 hover:bg-slate-100")}
                              >
                                <Star className={cn("size-4 md:size-5", formData.rating >= s ? "fill-current" : "")} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button disabled={submitting} type="submit" className="w-full h-12 md:h-16 rounded-full bg-accent text-white hover:bg-primary transition-all duration-500 shadow-xl shadow-accent/10">
                          <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                            {submitting ? <Loader2 className="animate-spin size-4" /> : <>Submit Review <ChevronRight className="size-4" /></>}
                          </span>
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center space-y-6">
                      <div className="size-16 md:size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CheckCircle2 className="size-8 md:size-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl md:text-2xl font-black text-accent">Feedback Received</h4>
                        <p className="text-muted text-sm font-medium">Thank you for helping us maintain our standards.</p>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary/80 to-accent" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
