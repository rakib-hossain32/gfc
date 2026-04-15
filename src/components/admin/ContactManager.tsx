"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  User,
  Trash2,
  Loader2,
  MessageSquare,
  Inbox,
  Clock,
  ExternalLink,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Inquiry {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  sector?: string;
  message: string;
  createdAt: string;
}

export function ContactManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDeleteClick = (id: string) => {
    setInquiryToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;
    try {
      await fetch(`/api/contact?id=${inquiryToDelete}`, { method: "DELETE" });
      fetchInquiries();
      setDeleteConfirmOpen(false);
      setInquiryToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setInquiryToDelete(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = inquiries.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Briefings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-accent uppercase tracking-tighter italic">Inquiry <span className="text-primary italic">Briefings.</span></h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global institutional contact stream</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">Live Stream</span>
          </div>
          <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">{inquiries.length} Messages</span>
          </div>
        </div>
      </div>

      {/* --- LIST --- */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {currentInquiries.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 relative group overflow-hidden"
            >
              {/* Decorative side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-100 group-hover:bg-primary transition-colors duration-700" />

              <div className="flex flex-col lg:flex-row justify-between gap-10">
                <div className="space-y-8 flex-1">
                  <div className="flex items-center gap-5">
                    <div className="size-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-700 shadow-sm">
                      <User className="size-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-black text-accent uppercase tracking-tighter italic leading-none">{item.name}</h3>
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">Inquiry</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                        <Shield className="size-3" /> {item.sector || "General Consultation"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-dashed border-slate-100 group-hover:bg-white transition-colors duration-700">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-4 text-slate-500 hover:text-primary transition-all group/link">
                      <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/link:bg-primary/10 transition-colors">
                        <Mail className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Mail</span>
                        <span className="text-xs font-bold truncate">{item.email || "N/A"}</span>
                      </div>
                    </a>
                    <a href={`tel:${item.phone}`} className="flex items-center gap-4 text-slate-500 hover:text-primary transition-all group/link">
                      <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/link:bg-primary/10 transition-colors">
                        <Phone className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hotline Protocol</span>
                        <span className="text-xs font-bold">{item.phone}</span>
                      </div>
                    </a>
                  </div>

                  <div className="p-8 bg-slate-900 rounded-4xl relative group-hover:bg-slate-950 transition-colors duration-700 shadow-xl overflow-hidden min-h-35">
                    <div className="absolute -top-4 -right-4 size-32 bg-primary/10 rounded-full blur-3xl" />
                    <MessageSquare className="absolute top-6 right-6 size-10 text-white/5" />
                    <p className="text-base text-slate-300 font-medium leading-relaxed italic relative z-10">
                      "{item.message}"
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-col justify-between items-start lg:items-end gap-6 min-w-45">
                  <div className="space-y-3 flex lg:flex-col items-end">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                      <Clock className="size-3" /> {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-5 py-2.5 rounded-full border border-primary/10">
                      <Calendar className="size-3" /> {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="size-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-red-500/20"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="size-6" />
                    </button>
                    <button
                      className="size-14 rounded-2xl bg-slate-50 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-500 shadow-sm"
                      title="Mark as Processed"
                    >
                      <Inbox className="size-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Badge Top Right */}
              <div className="absolute top-0 right-0 p-1">
                <div className="px-4 py-1.5 bg-accent text-white text-[9px] font-black uppercase tracking-widest italic rounded-bl-2xl">
                  Institutional Data
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {inquiries.length === 0 && (
          <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200 flex flex-col items-center gap-6">
            <div className="size-24 rounded-full bg-slate-100 flex items-center justify-center">
              <Inbox className="size-12 text-slate-300 animate-bounce" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-black text-accent uppercase tracking-tighter italic">No Active Briefings</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global institutional contact stream is currently idle</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-accent shadow-sm"
          >
            <span className="text-xl font-black">←</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`size-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-sm ${currentPage === page
                ? "bg-accent text-white border-2 border-accent scale-110"
                : "bg-white text-accent border border-slate-200 hover:bg-slate-50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-accent shadow-sm"
          >
            <span className="text-xl font-black">→</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 size-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 size-32 bg-accent/5 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-8">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="size-20 rounded-3xl bg-red-50 flex items-center justify-center">
                      <Trash2 className="size-10 text-red-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                      Confirm <span className="text-red-500">Deletion</span>
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Are you sure you want to permanently remove this inquiry? This action cannot be undone.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 h-14 rounded-2xl bg-slate-100 text-accent font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
