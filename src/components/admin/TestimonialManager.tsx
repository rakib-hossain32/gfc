"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Loader2, 
  ChevronLeft, 
  ChevronRight,
  MessageSquareQuote,
  MoreHorizontal,
  X
} from "lucide-react";
import Image from "next/image";

interface Review {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  status: string;
  createdAt: string;
}

export function TestimonialManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReviews = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/testimonials?page=${p}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setTotalPages(data.pagination?.pages || 1);
      setTotalCount(data.pagination?.total || 0);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this feedback permanently?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      fetchReviews(page);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchReviews(page);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
               <MessageSquareQuote className="size-6" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Feedbacks</p>
               <p className="text-2xl font-black text-accent">{totalCount}</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
               <Clock className="size-6" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pending Review</p>
               <p className="text-2xl font-black text-accent">{reviews.filter(r => r.status === 'pending').length}</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <CheckCircle2 className="size-6" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Approved Live</p>
               <p className="text-2xl font-black text-accent">{reviews.filter(r => r.status === 'approved').length}</p>
            </div>
         </div>
      </div>

      {/* List Area */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
           <h3 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
             <div className="h-4 w-1 bg-primary rounded-full" />
             Testimonial Monitor
           </h3>
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Page {page} of {totalPages}</span>
           </div>
        </div>

        <div className="divide-y divide-slate-50">
           {loading ? (
             <div className="p-20 text-center"><Loader2 className="size-8 animate-spin mx-auto text-primary" /></div>
           ) : reviews.length === 0 ? (
             <div className="p-20 text-center text-slate-400 font-bold">No feedback records found.</div>
           ) : reviews.map((review, i) => (
             <motion.div 
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               key={review._id} 
               className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:bg-slate-50/50 transition-colors group"
             >
                {/* Profile */}
                <div className="flex gap-4 min-w-[240px] shrink-0">
                   <div className="size-14 rounded-full overflow-hidden relative border-2 border-slate-100">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                   </div>
                   <div className="flex flex-col min-w-0">
                      <h4 className="font-black text-accent truncate transform group-hover:text-primary transition-colors">{review.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{review.role}</p>
                      <div className="flex gap-0.5 mt-1.5 font-bold">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`size-2.5 ${i < review.rating ? 'fill-primary text-primary' : 'text-slate-200'}`} />
                         ))}
                      </div>
                   </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                   <div className="bg-slate-50 p-5 rounded-3xl relative">
                      <div className="absolute -left-2 top-4 size-4 bg-slate-50 rotate-45" />
                      <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                        &ldquo;{review.content}&rdquo;
                      </p>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                        Submitted: {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        review.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {review.status}
                      </span>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                   {review.status === 'pending' ? (
                     <button 
                       onClick={() => handleStatusUpdate(review._id, 'approved')}
                       className="h-10 px-4 rounded-xl bg-primary text-white text-[9px] font-black uppercase tracking-widest hover:bg-accent transition-all flex items-center gap-2"
                     >
                        <CheckCircle2 className="size-3" /> Approve
                     </button>
                   ) : (
                     <button 
                       onClick={() => handleStatusUpdate(review._id, 'pending')}
                       className="h-10 px-4 rounded-xl border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                     >
                        <Clock className="size-3" /> Revert
                     </button>
                   )}
                   <button 
                     onClick={() => handleDelete(review._id)}
                     className="h-10 px-4 rounded-xl border border-red-100 text-red-400 text-[9px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2"
                   >
                      <Trash2 className="size-3" /> Delete
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Pagination Bar */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-center gap-4 bg-slate-50/30">
           <button 
             disabled={page === 1}
             onClick={() => fetchReviews(page - 1)}
             className="size-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center disabled:opacity-30 hover:border-primary transition-all"
           >
              <ChevronLeft className="size-5" />
           </button>
           
           <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => fetchReviews(i + 1)}
                  className={`size-10 rounded-xl font-bold text-xs transition-all ${
                    page === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-slate-100 text-slate-400 hover:border-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
           </div>

           <button 
             disabled={page === totalPages}
             onClick={() => fetchReviews(page + 1)}
             className="size-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center disabled:opacity-30 hover:border-primary transition-all"
           >
              <ChevronRight className="size-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
