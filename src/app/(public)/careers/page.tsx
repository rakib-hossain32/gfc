"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { PageHero } from "@/src/components/ui/page-hero";
import { 
  Users, 
  Briefcase, 
  Trophy, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Send,
  Loader2,
  HardHat,
  Wrench,
  ShieldCheck,
  Building2
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SmartPhoneInput } from "@/src/components/ui/phone-input";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function CareersPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", position: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Health & Stability",
      desc: "Full medical coverage and housing assistance for our international manpower workforce."
    },
    {
      icon: Trophy,
      title: "Performance Rewards",
      desc: "Quarterly bonuses for staff who demonstrate exceptional dedication to project excellence."
    },
    {
      icon: Zap,
      title: "Rapid Growth",
      desc: "Get fast-tracked into supervisor roles based on your technical skill and leadership."
    },
    {
      icon: Users,
      title: "Diverse Culture",
      desc: "Join a multinational team of professionals from over 15 different countries."
    }
  ];

  const categories = [
    { title: "Facility Maintenance", icon: Wrench, roles: ["AC Technician", "Electrician", "Plumber", "HVAC Specialist"] },
    { title: "Specialized Manpower", icon: HardHat, roles: ["Project Manager", "Safety Officer", "Site Supervisor", "Technical Clerk"] },
    { title: "Industrial Cleaning", icon: ShieldCheck, roles: ["Janitorial Staff", "Rope Access Tech", "Machine Operator", "Supervisor"] },
    { title: "Corporate Operations", icon: Building2, roles: ["Operations Manager", "HR Specialist", "Business Dev", "Admin Assistant"] }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero 
        badge="Join Golden First Contracting"
        title="Forge Your"
        highlight="Career Path."
        description="We are constantly seeking tier-one talent to help us manage Saudi Arabia's most iconic infrastructure projects."
        watermark="Careers"
        centered
        breadcrumb={[{ label: "Careers", href: "/careers" }]}
      />

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
             <h2 className="text-4xl font-black text-accent uppercase tracking-tighter italic">Why Join <span className="text-primary italic">Our Mission?</span></h2>
             <p className="text-slate-500 font-medium leading-relaxed">We don't just offer jobs; we offer a seat at the table of Saudi Arabia's infrastructure evolution.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="size-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="text-lg font-black text-accent uppercase tracking-tighter italic mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories & Roles */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                 <h2 className="text-5xl font-extrabold text-accent tracking-tighter uppercase italic leading-[0.9]">Operational <br /><span className="text-primary">Sectors.</span></h2>
                 <p className="text-slate-500 text-lg font-medium max-w-md">We are actively sourcing candidates for the following core divisions across Riyadh and KAFD.</p>
              </div>

              <div className="space-y-8">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="size-12 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                      <cat.icon className="size-5" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-black text-accent uppercase tracking-widest">{cat.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.roles.map((role, ridx) => (
                          <span key={ridx} className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors cursor-default border border-transparent group-hover:border-primary/20">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div id="apply" className="bg-accent rounded-[4rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 space-y-10">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 space-y-6"
                  >
                    <div className="size-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/30">
                      <CheckCircle2 className="size-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Application Logged.</h3>
                      <p className="text-white/60 font-medium italic">Our Talent Acquisition team will review your profile shortly.</p>
                    </div>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="text-white border-white/20 hover:bg-white/10 uppercase font-black text-[10px] tracking-widest h-14 px-10 rounded-2xl">Submit Another</Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Initialize Inquiry</h3>
                       <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Start your professional journey with Golden First Contracting</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Full Name</label>
                           <input 
                             required
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:bg-white/10 focus:border-primary/50 outline-hidden transition-all placeholder:text-white/20"
                             placeholder="Riyadh Candidate"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Email Identity</label>
                           <input 
                             required
                             type="email"
                             value={formData.email}
                             onChange={(e) => setFormData({...formData, email: e.target.value})}
                             className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:bg-white/10 focus:border-primary/50 outline-hidden transition-all placeholder:text-white/20"
                             placeholder="email@example.com"
                           />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Phone Protocol</label>
                           <SmartPhoneInput 
                             value={formData.phone || ""}
                             onChange={(val) => setFormData({...formData, phone: val || ""})}
                             placeholder="+966544000000"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Intended Sector</label>
                           <select 
                             required
                             value={formData.position}
                             onChange={(e) => setFormData({...formData, position: e.target.value})}
                             className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:bg-white/10 focus:border-primary/50 outline-hidden transition-all appearance-none"
                           >
                              <option value="" className="bg-accent">Select Department</option>
                              <option value="Maintenance" className="bg-accent">Maintenance</option>
                              <option value="Manpower" className="bg-accent">Manpower</option>
                              <option value="Cleaning" className="bg-accent">Industrial Cleaning</option>
                              <option value="Corporate" className="bg-accent">Corporate / Office</option>
                           </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Technical Brief / Summary</label>
                         <textarea 
                           required
                           rows={4}
                           value={formData.message}
                           onChange={(e) => setFormData({...formData, message: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-white focus:bg-white/10 focus:border-primary/50 outline-hidden transition-all placeholder:text-white/20 resize-none"
                           placeholder="Tell us about your technical expertise and career goals..."
                         />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-16 rounded-3xl bg-primary hover:bg-white hover:text-primary text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/30 transition-all"
                      >
                        {loading ? <Loader2 className="size-5 animate-spin" /> : (
                          <span className="flex items-center gap-3">
                            <Send className="size-4" /> Finalize Application
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-slate-50 border-y border-slate-100 mb-20">
         <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale saturate-0">
               <div className="flex items-center gap-3"><ShieldCheck className="size-10" /><span className="text-xl font-black uppercase tracking-tight">Quality Certified</span></div>
               <div className="flex items-center gap-3"><Users className="size-10" /><span className="text-xl font-black uppercase tracking-tight">EEO Employer</span></div>
               <div className="flex items-center gap-3"><Briefcase className="size-10" /><span className="text-xl font-black uppercase tracking-tight">Saudi National Vision 2030</span></div>
            </div>
         </div>
      </section>
    </main>
  );
}
