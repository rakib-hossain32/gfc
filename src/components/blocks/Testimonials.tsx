"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Star, 
  Quote, 
  Plus, 
  X, 
  MessageSquarePlus, 
  CheckCircle2,
  ChevronRight,
  Loader2
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });

  const fetchApprovedReviews = async (pageNum = 1) => {
    try {
      const res = await fetch(`/api/testimonials?status=approved&page=${pageNum}&limit=6`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setReviews(data.reviews || []);
      } else {
        setReviews(prev => [...prev, ...(data.reviews || [])]);
      }
      
      setHasMore(data.pagination.page < data.pagination.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchApprovedReviews(nextPage);
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
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
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={cn(
      "py-16 md:py-24 bg-slate-50 relative overflow-hidden",
      isModalOpen ? "z-50" : "z-10"
    )}>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-white to-transparent" />
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

        {/* --- GRID --- */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-8 text-primary animate-spin" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.length > 0 ? reviews.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative p-8 sm:p-10 rounded-4xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-10 right-10 size-12 text-primary/5 group-hover:text-primary transition-colors duration-500">
                  <Quote className="size-full fill-current" />
                </div>

                <div className="flex gap-1 mb-6 sm:mb-8 font-bold">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-accent text-base sm:text-lg font-medium leading-relaxed mb-8 sm:mb-10 min-h-[120px]">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-8 sm:pt-10 border-t border-slate-50">
                  <div className="relative size-12 sm:size-14 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-primary transition-colors duration-500">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-accent group-hover:text-primary transition-colors truncate">{item.name}</h4>
                    <p className="text-[9px] sm:text-[10px] font-bold text-muted uppercase tracking-[0.2em] truncate">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Institutional feedback repository is being updated.</p>
                 <button onClick={() => setIsModalOpen(true)} className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline">Be the first to share your experience</button>
              </div>
            )}
          </div>
        )}

        {/* --- LOAD MORE --- */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={loadMore}
              variant="outline"
              className="rounded-full h-14 px-10 border-slate-200 hover:border-primary hover:text-primary transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              Load More Testimonials
            </Button>
          </div>
        )}

        {/* --- CTA BUTTON --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="h-12 w-px bg-linear-to-b from-primary/30 to-transparent" />
          <Button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-full h-16 px-10 bg-accent text-white hover:bg-primary transition-all duration-300 shadow-xl shadow-accent/10 group"
          >
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
              Share Your Experience <MessageSquarePlus className="size-5" />
            </span>
          </Button>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">Join the leaders of Saudi Arabia</p>
        </motion.div>

        {/* --- MODAL --- */}
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
                className="relative w-full max-w-xl bg-white rounded-4xl shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-8 right-8 size-10 rounded-full bg-slate-50 flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all shadow-sm z-10"
                >
                  <X className="size-5" />
                </button>

                <div className="p-8 sm:p-12">
                   {!isSubmitted ? (
                      <div className="space-y-8 sm:space-y-10">
                        <div className="space-y-4 text-center md:text-left">
                           <h3 className="text-2xl sm:text-3xl font-black text-accent">Submit a <span className="text-primary italic font-serif">Review.</span></h3>
                           <p className="text-muted text-sm font-medium">Your feedback drives our pursuit of operational excellence across Riyadh.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Full Name</label>
                                 <Input 
                                   value={formData.name}
                                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                                   placeholder="Ahmed Khalid" required className="h-14 rounded-xl border-slate-100 focus:ring-primary/20 font-bold" 
                                  />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Professional Role</label>
                                 <Input 
                                   value={formData.role}
                                   onChange={(e) => setFormData({...formData, role: e.target.value})}
                                   placeholder="Property Manager" required className="h-14 rounded-xl border-slate-100 focus:ring-primary/20 font-bold" 
                                  />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Your Experience</label>
                              <Textarea 
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                placeholder="Share details about our performance..." required className="min-h-[140px] rounded-2xl border-slate-100 focus:ring-primary/20 p-4 font-bold" 
                              />
                           </div>

                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-accent ml-1">Overall Rating</label>
                              <div className="flex gap-2">
                                 {[1, 2, 3, 4, 5].map((s) => (
                                    <button 
                                      key={s} 
                                      type="button" 
                                      onClick={() => setFormData({...formData, rating: s})}
                                      className={cn(
                                        "size-10 rounded-xl flex items-center justify-center transition-all",
                                        formData.rating >= s ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-300 hover:bg-slate-100"
                                      )}
                                    >
                                       <Star className={cn("size-5", formData.rating >= s ? "fill-current" : "")} />
                                    </button>
                                 ))}
                              </div>
                           </div>
                           
                           <Button disabled={submitting} type="submit" className="w-full h-16 rounded-full bg-accent text-white hover:bg-primary transition-all duration-500 shadow-xl shadow-accent/10">
                              <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                                 {submitting ? <Loader2 className="animate-spin" /> : <>Relay Feedback <ChevronRight className="size-4" /></>}
                              </span>
                           </Button>
                        </form>
                      </div>
                   ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 flex flex-col items-center text-center space-y-6"
                      >
                         <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="size-10" />
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-2xl font-black text-accent">Feedback Received</h4>
                            <p className="text-muted text-sm font-medium">Thank you for helping us maintain Saudi Arabiai corporate standards.</p>
                         </div>
                      </motion.div>
                   )}
                </div>
                
                <div className="h-2 w-full bg-linear-to-r from-primary via-primary/80 to-accent" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
