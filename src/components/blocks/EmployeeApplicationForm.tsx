"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Briefcase, FileText,
  ChevronRight, ChevronLeft, CheckCircle2, Loader2,
  Globe, Calendar, Star, Wrench, AlertCircle, ArrowLeft,
  Building2, ClipboardList, UserCheck
} from "lucide-react";import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

const POSITIONS = [
  "AC Technician", "Electrician", "Plumber", "HVAC Specialist",
  "Project Manager", "Safety Officer", "Site Supervisor", "Technical Clerk",
  "Janitorial Staff", "Rope Access Technician", "Machine Operator",
  "Operations Manager", "HR Specialist", "Admin Assistant", "Business Development",
  "Security Guard", "Driver", "Other"
];

const NATIONALITIES = [
  "Bangladeshi", "Indian", "Pakistani", "Nepali", "Sri Lankan",
  "Filipino", "Egyptian", "Jordanian", "Sudanese", "Ethiopian",
  "Kenyan", "Ugandan", "Indonesian", "Other"
];

const SKILLS = [
  "Electrical Work", "Plumbing", "HVAC/AC", "Welding", "Carpentry",
  "Painting", "Cleaning Operations", "Rope Access", "Forklift Operation",
  "Safety Management", "Project Coordination", "Computer Skills",
  "Driving (LMV)", "Driving (HMV)", "First Aid", "Arabic Language",
];

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1 — Personal
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  gender: string;
  // Step 2 — Documents & Location
  passportNumber: string;
  passportExpiry: string;
  qidNumber: string;
  currentLocation: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  // Step 3 — Professional
  position: string;
  experience: string;
  skills: string[];
  previousEmployer: string;
  availableFrom: string;
  expectedSalary: string;
  // Step 4 — Additional
  coverNote: string;
  hasSaudiVisa: string;
  willingToRelocate: string;
  referredBy: string;
}

const initial: FormData = {
  fullName: "", email: "", phone: "", nationality: "", dateOfBirth: "", gender: "",
  passportNumber: "", passportExpiry: "", qidNumber: "", currentLocation: "",
  emergencyContactName: "", emergencyContactPhone: "",
  position: "", experience: "", skills: [], previousEmployer: "", availableFrom: "", expectedSalary: "",
  coverNote: "", hasSaudiVisa: "", willingToRelocate: "", referredBy: "",
};

const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Documents", icon: FileText },
  { id: 3, label: "Professional", icon: Briefcase },
  { id: 4, label: "Final Details", icon: ClipboardList },
];

export function AlreadyAppliedScreen() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        <div className="size-24 rounded-full bg-highlight/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="size-12 text-highlight" />
        </div>
        <h2 className="text-2xl font-black text-accent uppercase tracking-tighter mb-3">Already Applied</h2>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          You have already submitted an employee application. Our HR team will contact you if your profile matches an opening.
        </p>
        <Link href="/profile">
          <Button className="rounded-2xl h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-accent text-white">
            Back to Profile
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export function EmployeeApplicationForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    ...initial,
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleSkill = (skill: string) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: session?.user?.email,   // always use session email, not form input
          phone: form.phone,
          position: form.position,
          message: form.coverNote,
          nationality: form.nationality,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          passportNumber: form.passportNumber,
          passportExpiry: form.passportExpiry,
          qidNumber: form.qidNumber,
          currentLocation: form.currentLocation,
          emergencyContactName: form.emergencyContactName,
          emergencyContactPhone: form.emergencyContactPhone,
          experience: form.experience,
          skills: form.skills.join(", "),
          previousEmployer: form.previousEmployer,
          availableFrom: form.availableFrom,
          expectedSalary: form.expectedSalary,
          hasSaudiVisa: form.hasSaudiVisa,
          willingToRelocate: form.willingToRelocate,
          referredBy: form.referredBy,
          applicationType: "employee",
        }),
      });
      if (res.status === 409) { setAlreadyApplied(true); return; }
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-accent focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-300";
  const labelCls = "text-[9px] font-black uppercase tracking-[0.2em] text-muted block mb-2";

  if (submitted) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-12 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-accent uppercase tracking-tighter mb-3">Application Submitted</h2>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            Your employee application has been received. Our HR team will review your profile and contact you within 3–5 business days.
          </p>
          <Link href="/profile">
            <Button className="rounded-2xl h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
              Back to Profile
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-highlight/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link href="/profile" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors mb-8">
          <ArrowLeft className="size-3.5" /> Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <UserCheck className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-accent uppercase tracking-tight">Employee Application</h1>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">Golden First Contracting — Join Our Team</p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-300 text-[9px] font-black uppercase tracking-widest whitespace-nowrap",
                step === s.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : step > s.id
                  ? "bg-green-100 text-green-700"
                  : "bg-white text-muted border border-slate-100"
              )}>
                {step > s.id
                  ? <CheckCircle2 className="size-3 shrink-0" />
                  : <s.icon className="size-3 shrink-0" />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px flex-1 transition-all", step > s.id ? "bg-green-200" : "bg-slate-200")} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-6 md:p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionTitle icon={User} title="Personal Information" subtitle="Your basic identity details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Full Name (as per passport)</label>
                    <input className={inputCls} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Mohammed Al-Rashid" />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                      className={cn(inputCls, "bg-slate-100 cursor-not-allowed text-muted")}
                      type="email"
                      value={session?.user?.email || ""}
                      readOnly
                      tabIndex={-1}
                    />
                    <p className="text-[9px] text-muted mt-1 ml-1">Linked to your account — cannot be changed</p>
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number</label>
                    <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+966 XXXX XXXX" />
                  </div>
                  <div>
                    <label className={labelCls}>Nationality</label>
                    <select className={inputCls} value={form.nationality} onChange={(e) => set("nationality", e.target.value)}>
                      <option value="">Select nationality</option>
                      {NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Date of Birth</label>
                    <input className={inputCls} type="date" value={form.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Gender</label>
                    <select className={inputCls} value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionTitle icon={FileText} title="Documents & Location" subtitle="Identification and contact details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className={labelCls}>Passport Number</label>
                    <input className={inputCls} value={form.passportNumber} onChange={(e) => set("passportNumber", e.target.value)} placeholder="A12345678" />
                  </div>
                  <div>
                    <label className={labelCls}>Passport Expiry Date</label>
                    <input className={inputCls} type="date" value={form.passportExpiry} onChange={(e) => set("passportExpiry", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>National ID (Iqama/NID)</label>
                    <input className={inputCls} value={form.qidNumber} onChange={(e) => set("qidNumber", e.target.value)} placeholder="1XXXXXXXXX" />
                  </div>
                  <div>
                    <label className={labelCls}>Current Location / City</label>
                    <input className={inputCls} value={form.currentLocation} onChange={(e) => set("currentLocation", e.target.value)} placeholder="Riyadh, Saudi Arabia" />
                  </div>
                  <div>
                    <label className={labelCls}>Emergency Contact Name</label>
                    <input className={inputCls} value={form.emergencyContactName} onChange={(e) => set("emergencyContactName", e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelCls}>Emergency Contact Phone</label>
                    <input className={inputCls} value={form.emergencyContactPhone} onChange={(e) => set("emergencyContactPhone", e.target.value)} placeholder="+966 XXXX XXXX" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionTitle icon={Briefcase} title="Professional Details" subtitle="Your work experience and skills" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className={labelCls}>Position Applied For</label>
                    <select className={inputCls} value={form.position} onChange={(e) => set("position", e.target.value)}>
                      <option value="">Select position</option>
                      {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Years of Experience</label>
                    <select className={inputCls} value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1 – 3 years</option>
                      <option value="3-5">3 – 5 years</option>
                      <option value="5-10">5 – 10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Previous Employer (if any)</label>
                    <input className={inputCls} value={form.previousEmployer} onChange={(e) => set("previousEmployer", e.target.value)} placeholder="Company name" />
                  </div>
                  <div>
                    <label className={labelCls}>Available From</label>
                    <input className={inputCls} type="date" value={form.availableFrom} onChange={(e) => set("availableFrom", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Expected Monthly Salary (SAR)</label>
                    <input className={inputCls} value={form.expectedSalary} onChange={(e) => set("expectedSalary", e.target.value)} placeholder="e.g. 1500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Skills & Certifications (select all that apply)</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SKILLS.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                            form.skills.includes(skill)
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-slate-50 text-muted border-slate-200 hover:border-primary/40 hover:text-primary"
                          )}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SectionTitle icon={ClipboardList} title="Final Details" subtitle="Additional information and cover note" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className={labelCls}>Do you have a valid Saudi Visa?</label>
                    <select className={inputCls} value={form.hasSaudiVisa} onChange={(e) => set("hasSaudiVisa", e.target.value)}>
                      <option value="">Select</option>
                      <option value="Yes — Work Visa">Yes — Work Visa</option>
                      <option value="Yes — Visit Visa">Yes — Visit Visa</option>
                      <option value="No — Need Sponsorship">No — Need Sponsorship</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Willing to Relocate within Saudi Arabia?</label>
                    <select className={inputCls} value={form.willingToRelocate} onChange={(e) => set("willingToRelocate", e.target.value)}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Depends on location">Depends on location</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Referred By (optional)</label>
                    <input className={inputCls} value={form.referredBy} onChange={(e) => set("referredBy", e.target.value)} placeholder="Name of person who referred you" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Cover Note / Personal Statement</label>
                    <textarea
                      rows={5}
                      value={form.coverNote}
                      onChange={(e) => set("coverNote", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-accent focus:outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-300 resize-none"
                      placeholder="Briefly describe your background, why you want to join Golden First Contracting, and what makes you a strong candidate..."
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 mt-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
                    <AlertCircle className="size-4 shrink-0" /> {error}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setStep((s) => (s > 1 ? (s - 1) as Step : s))}
              disabled={step === 1}
              className="flex items-center gap-2 h-11 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-accent/50 hover:text-accent hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="size-3.5" /> Previous
            </button>

            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => (s < 4 ? (s + 1) as Step : s))}
                className="rounded-2xl h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              >
                Next Step <ChevronRight className="size-3.5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting || !form.fullName || !form.email || !form.position}
                className="rounded-2xl h-11 px-6 gap-2 text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />}
                Submit Application
              </Button>
            )}
          </div>
        </div>

        {/* Step counter */}
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted mt-6">
          Step {step} of {steps.length}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-2xl bg-primary/8 flex items-center justify-center">
        <Icon className="size-5 text-primary" />
      </div>
      <div>
        <h2 className="text-sm font-black text-accent uppercase tracking-widest">{title}</h2>
        <p className="text-[10px] text-muted mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
function setAlreadyApplied(arg0: boolean) {
  throw new Error("Function not implemented.");
}

