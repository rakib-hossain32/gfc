"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar, User, Briefcase, Trash2, Loader2,
  MessageSquare, Search, ChevronLeft, ChevronRight,
  X, FileText, Shield, Clock,
  CheckCircle2, XCircle, AlertCircle, Eye, RefreshCw,
  Inbox
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  status: "pending" | "reviewed" | "shortlisted" | "hired" | "rejected";
  appliedAt: string;
  applicationType?: string;
  nationality?: string;
  dateOfBirth?: string;
  gender?: string;
  passportNumber?: string;
  passportExpiry?: string;
  qidNumber?: string;
  currentLocation?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  experience?: string;
  skills?: string;
  previousEmployer?: string;
  availableFrom?: string;
  expectedSalary?: string;
  hasSaudiVisa?: string;
  willingToRelocate?: string;
  referredBy?: string;
  coverNote?: string;
}

const STATUS_CONFIG = {
  pending:     { label: "Pending",     color: "bg-amber-100 text-amber-700",   dot: "bg-amber-500",   icon: Clock },
  reviewed:    { label: "Reviewed",    color: "bg-blue-100 text-blue-700",     dot: "bg-blue-500",    icon: Eye },
  shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-700",   dot: "bg-green-500",   icon: CheckCircle2 },
  hired:       { label: "Hired",       color: "bg-primary/10 text-primary",    dot: "bg-primary",     icon: CheckCircle2 },
  rejected:    { label: "Rejected",    color: "bg-red-100 text-red-700",       dot: "bg-red-500",     icon: XCircle },
};

export function CareerManager() {
  const [apps, setApps] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const LIMIT = 15;

  const fetchApps = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const params = new URLSearchParams({
        page: String(page), limit: String(LIMIT),
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { type: typeFilter }),
      });
      const res = await fetch(`/api/careers?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setFetchError(data.error || "Failed to load applications");
        return;
      }

      // Handle both old array format and new paginated format
      if (Array.isArray(data)) {
        setApps(data);
        setTotal(data.length);
      } else {
        setApps(data.applications || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error(err);
      setFetchError("Network error — could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, typeFilter]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/careers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setApps((prev) => prev.map((a) => a._id === id ? { ...a, status: status as Application["status"] } : a));
      if (selected?._id === id) setSelected((s) => s ? { ...s, status: status as Application["status"] } : s);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Permanently delete this application?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/careers/${id}`, { method: "DELETE" });
      setApps((prev) => prev.filter((a) => a._id !== id));
      setTotal((t) => t - 1);
      if (selected?._id === id) setSelected(null);
    } finally {
      setDeletingId(null);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-accent uppercase tracking-tighter italic">
            Talent <span className="text-primary">Pipeline.</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            {total} total application{total !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={fetchApps} className="flex items-center gap-2 h-10 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest text-accent transition-all">
          <RefreshCw className="size-3.5" /> Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["pending","reviewed","shortlisted","hired","rejected"] as const).map((s) => {
          const cfg = STATUS_CONFIG[s];
          const count = apps.filter(a => a.status === s).length;
          return (
            <button key={s} onClick={() => { setStatusFilter(statusFilter === s ? "" : s); setPage(1); }}
              className={cn("p-4 rounded-3xl border text-left transition-all", statusFilter === s ? "border-primary bg-primary/5" : "bg-white border-slate-100 hover:border-slate-200")}>
              <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2", cfg.color)}>
                <div className={cn("size-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
              </div>
              <p className="text-2xl font-black text-accent">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, email, position, nationality..."
            className="w-full h-11 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-primary transition-all"
          />
          {searchInput && (
            <button onClick={() => setSearchInput("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent">
              <X className="size-4" />
            </button>
          )}
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-accent focus:outline-none focus:border-primary transition-all"
        >
          <option value="">All Types</option>
          <option value="employee">Employee Application</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
          {["Applicant", "Position", "Type", "Location", "Status", "Actions"].map((h) => (
            <span key={h} className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Loading...</span>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle className="size-10 text-red-400" />
            <p className="text-sm font-bold text-red-500">{fetchError}</p>
            <button onClick={fetchApps} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
              Try Again
            </button>
          </div>
        ) : apps.length === 0 ? (
          <div className="text-center py-20">
            <Inbox className="size-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No applications found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {apps.map((app) => {
              const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
              return (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Applicant */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-2xl bg-primary/8 flex items-center justify-center text-primary font-black text-sm shrink-0">
                      {app.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-accent truncate">{app.name}</p>
                      <p className="text-[10px] text-muted truncate">{app.email}</p>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-accent truncate">{app.position}</p>
                    <p className="text-[10px] text-muted">{app.experience ? `${app.experience} yrs` : "—"}</p>
                  </div>

                  {/* Type */}
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit",
                    app.applicationType === "employee" ? "bg-primary/10 text-primary" : "bg-slate-100 text-muted"
                  )}>
                    {app.applicationType === "employee" ? "Employee" : "General"}
                  </span>

                  {/* Location */}
                  <p className="text-xs text-muted truncate">{app.currentLocation || app.nationality || "—"}</p>

                  {/* Status */}
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    disabled={updatingId === app._id}
                    className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      cfg.color
                    )}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelected(app)}
                      className="size-8 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-muted flex items-center justify-center transition-all"
                    >
                      <Eye className="size-3.5" />
                    </button>
                    <button
                      onClick={() => deleteApp(app._id)}
                      disabled={deletingId === app._id}
                      className="size-8 rounded-xl bg-red-50 hover:bg-red-500 hover:text-white text-red-400 flex items-center justify-center transition-all"
                    >
                      {deletingId === app._id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
              Page {page} of {totalPages} — {total} records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="size-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center transition-all"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = page <= 3 ? i + 1 : page - 2 + i;
                if (p < 1 || p > totalPages) return null;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={cn("size-9 rounded-xl text-xs font-black transition-all",
                      p === page ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 hover:bg-slate-200 text-accent"
                    )}>
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="size-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center transition-all"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">Application Detail</p>
                  <h3 className="text-base font-black text-accent">{selected.name}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="size-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status bar */}
                <div className="flex items-center gap-3 flex-wrap">
                  {(["pending","reviewed","shortlisted","hired","rejected"] as const).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <button key={s} onClick={() => updateStatus(selected._id, s)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                          selected.status === s ? `${cfg.color} border-transparent shadow-sm` : "bg-white border-slate-200 text-muted hover:border-slate-300"
                        )}>
                        <div className={cn("size-1.5 rounded-full", cfg.dot)} />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>

                {/* Personal */}
                <Section title="Personal Information" icon={User}>
                  <Row label="Full Name" value={selected.name} />
                  <Row label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                  <Row label="Phone" value={selected.phone} href={`tel:${selected.phone}`} />
                  <Row label="Nationality" value={selected.nationality} />
                  <Row label="Date of Birth" value={selected.dateOfBirth} />
                  <Row label="Gender" value={selected.gender} />
                  <Row label="Current Location" value={selected.currentLocation} />
                </Section>

                {/* Documents */}
                <Section title="Documents" icon={FileText}>
                  <Row label="Passport No." value={selected.passportNumber} />
                  <Row label="Passport Expiry" value={selected.passportExpiry} />
                  <Row label="National ID" value={selected.qidNumber} />
                  <Row label="Saudi Visa" value={selected.hasSaudiVisa} />
                </Section>

                {/* Professional */}
                <Section title="Professional" icon={Briefcase}>
                  <Row label="Position Applied" value={selected.position} />
                  <Row label="Experience" value={selected.experience} />
                  <Row label="Previous Employer" value={selected.previousEmployer} />
                  <Row label="Available From" value={selected.availableFrom} />
                  <Row label="Expected Salary (QAR)" value={selected.expectedSalary} />
                  <Row label="Willing to Relocate" value={selected.willingToRelocate} />
                  {selected.skills && (
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.skills.split(",").map((s) => (
                          <span key={s} className="px-2.5 py-1 bg-primary/8 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>

                {/* Emergency */}
                <Section title="Emergency Contact" icon={Shield}>
                  <Row label="Name" value={selected.emergencyContactName} />
                  <Row label="Phone" value={selected.emergencyContactPhone} href={`tel:${selected.emergencyContactPhone}`} />
                </Section>

                {/* Cover Note */}
                {(selected.message || selected.coverNote) && (
                  <Section title="Cover Note" icon={MessageSquare}>
                    <p className="text-sm text-accent/80 leading-relaxed italic">
                      &ldquo;{selected.message || selected.coverNote}&rdquo;
                    </p>
                  </Section>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] text-muted font-bold">
                    <Calendar className="size-3.5" />
                    Applied {new Date(selected.appliedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  {selected.referredBy && (
                    <span className="text-[10px] text-muted font-bold">Ref: {selected.referredBy}</span>
                  )}
                </div>

                <button
                  onClick={() => deleteApp(selected._id)}
                  className="w-full h-11 rounded-2xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="size-3.5" /> Delete Application
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 rounded-3xl p-5 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="size-7 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="size-3.5 text-primary" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[10px] font-bold text-muted uppercase tracking-widest shrink-0">{label}</span>
      {href ? (
        <a href={href} className="text-xs font-bold text-primary hover:underline text-right">{value}</a>
      ) : (
        <span className="text-xs font-bold text-accent text-right">{value}</span>
      )}
    </div>
  );
}
