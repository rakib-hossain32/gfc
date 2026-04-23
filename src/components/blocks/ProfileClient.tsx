"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  User, Mail, Phone, Shield, Edit3, Save, X,
  Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, Crown, Clock, Briefcase, ChevronRight,
  Timer, Star, XCircle, CreditCard, ChevronLeft, LogOut
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { EmployeeIdCard } from "@/src/components/blocks/EmployeeIdCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
  application?: {
    id: string;
    status: string;
    position: string;
    appliedAt: string;
    name: string;
    nationality?: string;
  } | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const }
  }),
};

export function ProfileClient() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [showPassSection, setShowPassSection] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "" });
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setForm({ name: data.name, phone: data.phone || "" });
      })
      .finally(() => setLoading(false));
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setProfile((p) => p ? { ...p, name: form.name, phone: form.phone } : p);
      await update({ name: form.name });
      setEditMode(false);
      showToast("success", "Profile updated successfully.");
    } catch (e: unknown) {
      showToast("error", e instanceof Error ? e.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passForm.newPassword !== passForm.confirm) {
      showToast("error", "New passwords do not match.");
      return;
    }
    if (passForm.newPassword.length < 8) {
      showToast("error", "Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: passForm.currentPassword, newPassword: passForm.newPassword }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setPassForm({ currentPassword: "", newPassword: "", confirm: "" });
      setShowPassSection(false);
      showToast("success", "Password changed successfully.");
    } catch (e: unknown) {
      showToast("error", e instanceof Error ? e.message : "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  const initials = (profile?.name || session?.user?.name || "U")
    .split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="size-10 rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary relative pt-24">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        {/* Simple Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-accent hover:bg-slate-50 transition-all text-xs font-bold mb-8 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
          Back
        </motion.button>
        {/* Avatar + Name Row */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8"
        >
          <div className="relative group shrink-0">
            {/* Simple Avatar */}
            <div className="size-28 md:size-32 rounded-3xl bg-linear-to-br from-primary to-primary/90 flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg border-4 border-white overflow-hidden">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Avatar" width={128} height={128} sizes="128px" className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : initials}
            </div>
            
            {/* Role Badge */}
            {profile?.role === "admin" && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="absolute -top-2 -right-2 size-10 rounded-xl bg-highlight flex items-center justify-center shadow-lg border-3 border-white"
              >
                <Crown className="size-5 text-white" />
              </motion.div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
              <span className={cn(
                "inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border",
                profile?.role === "admin"
                  ? "bg-highlight/10 text-highlight border-highlight/20"
                  : "bg-primary/10 text-primary border-primary/20"
              )}>
                <div className="size-1.5 rounded-full bg-current" />
                {profile?.role === "admin" ? "Administrator" : "Member"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border bg-green-50 text-green-700 border-green-200">
                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-accent tracking-tight leading-none mb-2">{profile?.name}</h1>
            <p className="text-sm font-medium text-muted/70 flex items-center justify-center sm:justify-start gap-2 mb-4">
              <Mail className="size-4" />
              {profile?.email}
            </p>
            <p className="text-xs text-muted/50 flex items-center justify-center sm:justify-start gap-1.5">
              <Clock className="size-3.5" />
              Member since {memberSince}
            </p>
          </div>
          
          {!editMode && (
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="shrink-0"
            >
              <Button
                onClick={() => setEditMode(true)}
                className="rounded-xl h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-wider bg-accent hover:bg-slate-900 text-white shadow-lg"
              >
                <Edit3 className="size-4" /> Edit Profile
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Mail, label: "Email Address", value: profile?.email || "—" },
            { icon: Phone, label: "Phone Number", value: profile?.phone || "Not set" },
            { icon: Clock, label: "Member Since", value: memberSince },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp} initial="hidden" animate="visible" custom={i + 1}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-9 rounded-2xl bg-primary/8 flex items-center justify-center">
                  <stat.icon className="size-4 text-primary" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{stat.label}</span>
              </div>
              <p className="text-sm font-bold text-accent truncate">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Employee Application CTA or Status */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="mb-6"
        >
          {!profile?.application ? (
            <Link href="/profile/apply">
              <div className="group relative overflow-hidden bg-accent rounded-4xl p-6 md:p-8 cursor-pointer hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500">
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundImage: "radial-linear(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
                />
                <div className="absolute -right-8 -top-8 size-40 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 shrink-0">
                      <Briefcase className="size-7 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40 mb-1">Career Opportunity</p>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">Apply as an Employee</h3>
                      <p className="text-[11px] text-white/50 font-bold mt-1">Submit your full employment application to join Golden First Contracting</p>
                    </div>
                  </div>
                  <div className="size-10 rounded-2xl bg-white/10 group-hover:bg-primary flex items-center justify-center transition-all duration-300 shrink-0">
                    <ChevronRight className="size-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <ApplicationStatusCard application={profile.application} profile={profile} />
          )}
        </motion.div>

        {/* Edit Profile Card */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 md:p-8 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary/8 flex items-center justify-center">
                    <User className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-accent uppercase tracking-widest">Edit Profile</h2>
                    <p className="text-[10px] text-muted mt-0.5">Update your personal information</p>
                  </div>
                </div>
                <button onClick={() => { setEditMode(false); setForm({ name: profile?.name || "", phone: profile?.phone || "" }); }}
                  className="size-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <X className="size-4 text-accent/60" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted block mb-2">Full Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-accent focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted block mb-2">Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-accent focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="+974 XXXX XXXX"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="rounded-2xl h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                  Save Changes
                </Button>
                <button
                  onClick={() => { setEditMode(false); setForm({ name: profile?.name || "", phone: profile?.phone || "" }); }}
                  className="h-11 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-accent/60 hover:text-accent hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Card */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 md:p-8 mb-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-primary/8 flex items-center justify-center">
                <Shield className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-black text-accent uppercase tracking-widest">Security</h2>
                <p className="text-[10px] text-muted mt-0.5">Manage your password and account security</p>
              </div>
            </div>
            <button
              onClick={() => setShowPassSection((v) => !v)}
              className={cn(
                "flex items-center gap-2 h-9 px-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all",
                showPassSection
                  ? "bg-slate-100 text-accent/60"
                  : "bg-primary/8 text-primary hover:bg-primary/15"
              )}
            >
              <Lock className="size-3" />
              {showPassSection ? "Cancel" : "Change Password"}
            </button>
          </div>

          <AnimatePresence>
            {!showPassSection && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="size-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent">Password Protected</p>
                  <p className="text-[10px] text-muted">Your account is secured with a password.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showPassSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    { label: "Current Password", key: "currentPassword", show: showCurrent, toggle: () => setShowCurrent((v) => !v) },
                    { label: "New Password", key: "newPassword", show: showNew, toggle: () => setShowNew((v) => !v) },
                    { label: "Confirm New Password", key: "confirm", show: showNew, toggle: () => setShowNew((v) => !v) },
                  ].map(({ label, key, show, toggle }) => (
                    <div key={key}>
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-muted block mb-2">{label}</label>
                      <div className="relative">
                        <input
                          type={show ? "text" : "password"}
                          value={passForm[key as keyof typeof passForm]}
                          onChange={(e) => setPassForm((f) => ({ ...f, [key]: e.target.value }))}
                          className="w-full h-12 px-4 pr-11 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-accent focus:outline-none focus:border-primary focus:bg-white transition-all"
                          placeholder="••••••••"
                        />
                        <button type="button" onClick={toggle}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors">
                          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleChangePassword}
                  disabled={saving}
                  className="rounded-2xl h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Lock className="size-3.5" />}
                  Update Password
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sign Out */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={6}
          className="bg-white rounded-4xl border border-red-100 shadow-sm p-5 md:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-red-50 flex items-center justify-center">
                <LogOut className="size-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-sm font-black text-accent uppercase tracking-widest">Sign Out</h2>
                <p className="text-[10px] text-muted mt-0.5">End your current session</p>
              </div>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-2xl h-10 px-5 gap-2 text-[10px] font-black uppercase tracking-widest bg-red-500 hover:bg-red-600 text-white shadow-sm"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className={cn(
              "flex items-center gap-3 px-5 py-4 rounded-3xl shadow-2xl border text-sm font-bold",
              toast.type === "success"
                ? "bg-white border-green-100 text-green-700"
                : "bg-white border-red-100 text-red-600"
            )}>
              {toast.type === "success"
                ? <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                : <AlertCircle className="size-5 text-red-500 shrink-0" />}
              {toast.msg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Application Status Card ───────────────────────────────────────────────────

const STATUS_META = {
  pending:     { label: "Under Review",  desc: "Your application has been received and is awaiting review by our HR team.", color: "bg-amber-50 border-amber-200",  badge: "bg-amber-100 text-amber-700",  icon: Timer,        dot: "bg-amber-500" },
  reviewed:    { label: "Being Reviewed", desc: "Our HR team is actively reviewing your profile. We will update you soon.", color: "bg-blue-50 border-blue-200",    badge: "bg-blue-100 text-blue-700",    icon: Clock,        dot: "bg-blue-500" },
  shortlisted: { label: "Shortlisted!",  desc: "Congratulations! You have been shortlisted. Our team will contact you shortly.", color: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", icon: Star,         dot: "bg-green-500" },
  rejected:    { label: "Not Selected",  desc: "Thank you for applying. We will keep your profile for future opportunities.", color: "bg-slate-50 border-slate-200",  badge: "bg-slate-100 text-slate-500",  icon: XCircle,      dot: "bg-slate-400" },
  hired:       { label: "Hired!",        desc: "Welcome to Golden First Contracting! You are officially part of our team.", color: "bg-primary/5 border-primary/20",  badge: "bg-primary text-white",        icon: CheckCircle2, dot: "bg-primary" },
};

function ApplicationStatusCard({
  application,
  profile,
}: {
  application: NonNullable<UserProfile["application"]>;
  profile: UserProfile;
}) {
  const status = (application.status as keyof typeof STATUS_META) || "pending";
  const meta = STATUS_META[status] || STATUS_META.pending;
  const Icon = meta.icon;
  const isHired = status === "hired";
  const initials = (profile.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="space-y-4">
      {/* Status card */}
      <div className={cn("rounded-4xl border p-6 md:p-8 transition-all", meta.color)}>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className={cn("size-14 rounded-3xl flex items-center justify-center shadow-sm", isHired ? "bg-primary" : "bg-white")}>
              <Icon className={cn("size-7", isHired ? "text-white" : "text-current opacity-60")} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted mb-1">Application Status</p>
              <h3 className="text-xl font-black text-accent">{meta.label}</h3>
            </div>
          </div>
          <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shrink-0", meta.badge)}>
            <div className={cn("size-1.5 rounded-full", meta.dot)} />
            {status}
          </span>
        </div>

        <p className="text-sm text-accent/70 leading-relaxed mb-4">{meta.desc}</p>

        <div className="flex flex-wrap gap-3 text-[10px] font-bold text-muted">
          <span className="flex items-center gap-1.5"><Briefcase className="size-3" /> {application.position}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3" /> Applied {new Date(application.appliedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* ID Card section — only if hired */}
      {isHired && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-2xl bg-highlight/10 flex items-center justify-center">
              <CreditCard className="size-5 text-highlight" />
            </div>
            <div>
              <h3 className="text-sm font-black text-accent uppercase tracking-widest">Employee ID Card</h3>
              <p className="text-[10px] text-muted mt-0.5">Your official Golden First Contracting identification card</p>
            </div>
          </div>
          <EmployeeIdCard
            name={profile.name}
            position={application.position}
            email={profile.email}
            phone={profile.phone}
            nationality={application.nationality}
            employeeId={application.id.slice(-8).toUpperCase()}
            avatarInitials={initials}
          />
        </motion.div>
      )}
    </div>
  );
}
