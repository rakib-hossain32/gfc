"use client";

import { useState } from "react";
import { useSettings } from "@/src/components/providers/SettingsProvider";
import { motion, Variants } from "framer-motion";
import {
   
   CheckCircle2,
   ShieldCheck,
   Clock,
   
   Phone,
   
   Globe,
   Send
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { SectionHeader } from "@/src/components/ui/section-header";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { SmartPhoneInput } from "@/src/components/ui/phone-input";
import React from "react";

const features = [
   "Licensed Regional Professionals",
   "24/7 Rapid Response Unit",
   "Certified Quality Control",
   "Strategic Resource Planning",
   "Advanced Safety Compliance",
   "Turn-key Project Completion"
];



interface ServiceDetailsClientProps {
   slug: string;
   formattedTitle: string;
}

import { PageHero } from "@/src/components/ui/page-hero";

export function ServiceDetailsClient({ slug, formattedTitle }: ServiceDetailsClientProps) {
   const { settings } = useSettings();
   const [phoneNumber, setPhoneNumber] = useState("");
   const [submitting, setSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [formData, setFormData] = useState<{
      name: string;
      email: string;
      message: string;
   }>({
      name: "",
      email: "",
      message: ""
   });

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
         const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...formData,
               phone: phoneNumber,
               sector: formattedTitle, // Pre-fill sector with service title
            })
         });
         if (res.ok) {
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setPhoneNumber("");
         }
      } catch (err) {
         console.error(err);
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <main className="min-h-screen bg-white">
         <PageHero
            badge="Specialized Capability"
            title={formattedTitle}
            highlight="Solutions."
            description="Engineering precision and operational excellence for Saudi Arabia's most demanding institutional and commercial requirements."
            watermark="GFC"
            centered
            showBackButton
            breadcrumb={[
               { label: "Services", href: "/services" },
               { label: formattedTitle, href: `/services/${slug}` }
            ]}
         />

         {/* --- CONTENT SECTION --- */}
         <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
               <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                  {/* LEFT: INFORMATION */}
                  <div className="lg:col-span-12 xl:col-span-7 space-y-16">
                     <div className="space-y-10">
                        <SectionHeader
                           badge="Capabilities Overview"
                           title="Premier"
                           highlight="Framework."
                           align="left"
                           className="mb-0"
                        />
                        <div className="space-y-6 text-muted text-lg leading-relaxed">
                           <p>
                              Our <span className="text-accent font-bold capitalize">{formattedTitle}</span> service is built on a foundation of technical mastery and rigorous certified quality protocols.
                              We don&apos;t just provide a service; we integrate a specialized framework designed to optimize your assets and ensure
                              seamless operational flow.
                           </p>
                           <p>
                              By deploying the latest industrial technologies, at Golden First Contracting, we provide the highest tier of service 
                              demanded by Riyadh&apos;s premier corporations and residential estates.
                           </p>
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12 border-t border-slate-100 pt-16">
                        {features.map((feature, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-4 group"
                           >
                              <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                 <CheckCircle2 className="size-5" />
                              </div>
                              <span className="text-sm font-bold text-accent group-hover:text-primary transition-colors">{feature}</span>
                           </motion.div>
                        ))}
                     </div>

                     {/* Accreditations */}
                     <div className="flex flex-wrap items-center gap-12 grayscale opacity-30 pt-8">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="size-6 text-accent" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-accent">Quality Assured</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Globe className="size-6 text-accent" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-accent">GCC Standard</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Clock className="size-6 text-accent" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-accent">24/7 Ops</span>
                        </div>
                     </div>
                  </div>

                  {/* RIGHT: ACTION CARD */}
                  <div className="lg:col-span-12 xl:col-span-5 relative">
                     <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="sticky top-32"
                     >
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
                           {/* Decorative Background */}
                           <div className="absolute top-0 right-0 size-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

                           <div className="space-y-8">
                              <div>
                                 <h3 className="text-2xl font-black text-accent mb-2">Request a Briefing.</h3>
                                 <p className="text-sm font-medium text-muted">Initialize a consultation for your specific <span className="capitalize text-primary font-bold">{formattedTitle}</span> requirements.</p>
                              </div>

                              {!submitted ? (
                                 <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-accent/60 ml-1">Full Identity</label>
                                       <Input
                                          value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          placeholder="Mohammed Al-Rashid"
                                          required
                                          className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all font-medium text-sm"
                                       />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-accent/60 ml-1">Mobile</label>
                                          <div className="light-phone-input">
                                             <SmartPhoneInput
                                                value={phoneNumber}
                                                onChange={(val) => setPhoneNumber(val || "")}
                                                placeholder="+966..."
                                             />
                                          </div>
                                       </div>
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-accent/60 ml-1">Email</label>
                                          <Input
                                             type="email"
                                             value={formData.email}
                                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                             placeholder="corp@mail.sa"
                                             required
                                             className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all font-medium text-sm"
                                          />
                                       </div>
                                    </div>

                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-accent/60 ml-1">Project Brief</label>
                                       <Textarea
                                          value={formData.message}
                                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                          placeholder={`Describe your ${formattedTitle.toLowerCase()} needs...`}
                                          required
                                          className="min-h-25 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all resize-none p-4 font-medium text-sm"
                                       />
                                    </div>

                                    <Button disabled={submitting} type="submit" size="lg" className="w-full h-14 rounded-full bg-accent text-white hover:bg-primary transition-all duration-500 shadow-xl shadow-accent/10 group/btn">
                                       <span className="flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-xs">
                                          {submitting ? "Processing..." : "Initialize Quote"}
                                          {!submitting && <Send className="size-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                                       </span>
                                    </Button>
                                 </form>
                              ) : (
                                 <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-emerald-50 rounded-3xl p-8 text-center border border-emerald-100"
                                 >
                                    <div className="size-16 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm mx-auto mb-4">
                                       <CheckCircle2 className="size-8" />
                                    </div>
                                    <h4 className="text-xl font-black text-emerald-900 mb-2">Request Received</h4>
                                    <p className="text-sm text-emerald-700 font-medium mb-6">
                                       Our {formattedTitle} specialists have been notified. We will contact you at <span className="font-bold">{formData.email}</span> shortly.
                                    </p>
                                    <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full text-xs font-bold uppercase tracking-widest bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                                       Send Another Request
                                    </Button>
                                 </motion.div>
                              )}

                              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-muted">
                                 <div className="flex items-center gap-2">
                                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                                       <Phone className="size-4 text-primary" />
                                       <span className="text-xs font-bold">{settings.phone}</span>
                                    </a>
                                 </div>
                                 <p className="text-[10px] font-bold uppercase tracking-widest">
                                    Response: ~60 Min
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Background Ornaments */}
                        <div className="absolute -bottom-6 -left-6 size-32 border-2 border-primary/10 rounded-full -z-20" />
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>
      </main>
   );
}
