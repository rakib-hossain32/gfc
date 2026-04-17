"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, Variants } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  Globe,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";
import { PageHero } from "@/src/components/ui/page-hero";
import { SmartPhoneInput } from "@/src/components/ui/phone-input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

import { useSettings } from "@/src/components/providers/SettingsProvider";

// Define Variants for Framer Motion animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactClient() {
  const { settings } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: "Direct Hotlines",
      content: <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a>,
      tag: "24/7 Priority",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Mail,
      title: "Corporate Email",
      content: <a href={`mailto:${settings.email}`}>{settings.email}</a>,
      tag: "Official Response",
      color: "text-primary",
      bg: "bg-primary/5"
    },
    {
      icon: Clock,
      title: "Operational Hours",
      content: settings.operationalHours,
      tag: "GMT +3",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sector: values.subject // Map subject to sector for consistent email
        })
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        badge="Direct Channels"
        title="Initialize your"
        highlight=" Briefing."
        description="Partner with Golden First Contracting's strategic team. Our experts are ready to engineer solutions tailored for your corporate success."
        watermark="Connect"
        centered
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      {/* --- MAIN CONTENT GRID --- */}
      <section className="py-16 md:py-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* LEFT: THE PITCH & INFO */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <SectionHeader
                  badge="Direct Channels"
                  title="Initialize your"
                  highlight="Corporate Briefing."
                  align="left"
                  className="mb-8"
                />
                <p className="text-muted text-base leading-relaxed">
                  Connect directly with Golden First Contracting headquarters in KAFD, Riyadh. From strategic facility management to
                  industrial manpower supply, we are your primary point of operation.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {contactMethods.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`size-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                        <item.icon className="size-6" />
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.tag}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                      <div className="text-base font-black text-accent group-hover:text-primary transition-colors">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust Badges */}
              <div className="pt-10 border-t border-slate-100 flex items-center gap-10 grayscale opacity-40">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Quality Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">QCD Approved</span>
                </div>
              </div>
            </div>

            {/* RIGHT: THE FORM CARD */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-4xl p-10 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 size-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-accent mb-2">Request a <span className="text-primary italic font-serif">Response.</span></h3>
                    <p className="text-sm font-medium text-muted">Complete the inquiry briefing below for an immediate specialist assignment.</p>
                  </div>

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-accent/50">Full identity</label>
                        <Input
                          {...form.register("name")}
                          placeholder="Jassim Al-Kuwari"
                          className="h-11 md:h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                        />
                        {form.formState.errors.name && <p className="text-primary text-[10px] font-bold uppercase">{form.formState.errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-accent/50">Contact Hotline</label>
                        <div className="light-phone-input">
                          <Controller
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                              <SmartPhoneInput
                                value={field.value || ""}
                                onChange={(val) => field.onChange(val || "")}
                                placeholder="+97444000000"
                              />
                            )}
                          />
                        </div>
                        {form.formState.errors.phone && <p className="text-primary text-[10px] font-bold uppercase">{form.formState.errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-accent/50">Digital Mail</label>
                      <Input
                        {...form.register("email")}
                        placeholder="corporate@domain.qa"
                        className="h-11 md:h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                      {form.formState.errors.email && <p className="text-primary text-[10px] font-bold uppercase">{form.formState.errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-accent/50">Project Category</label>
                      <Input
                        {...form.register("subject")}
                        placeholder="E.g. Facility Management, Manpower..."
                        className="h-11 md:h-14 rounded-2xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-accent/50">Inquiry Briefing</label>
                      <Textarea
                        {...form.register("message")}
                        placeholder="Describe your operational requirements..."
                        className="min-h-40 rounded-4xl bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-primary/20 transition-all resize-none p-6 font-medium"
                      />
                      {form.formState.errors.message && <p className="text-primary text-[10px] font-bold uppercase">{form.formState.errors.message.message}</p>}
                    </div>

                    <Button disabled={submitting || submitted} type="submit" size="lg" className="w-full h-11 md:h-16 rounded-full bg-accent text-white hover:bg-primary transition-all duration-500 shadow-xl shadow-accent/10 group/btn">
                      <span className="flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-xs">
                        {submitted ? "Briefing Received" : submitting ? "Authorizing..." : "Authorize Dispatch"}
                        {!submitted && !submitting && <Send className="size-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                        {submitted && <CheckCircle2 className="size-4 text-emerald-400" />}
                      </span>
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Background Elements */}
              <div className="absolute -z-10 -bottom-10 -left-10 size-64 border-2 border-primary/5 rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SectionHeader
              badge="Headquarters"
              title="Location &"
              highlight="Global HQ."
              align="left"
              className="mb-0"
            />
            <Button variant="outline" className="rounded-full h-12 gap-2 uppercase tracking-widest text-[10px] font-black">
              Open Google Maps <ChevronRight className="size-4" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-125 rounded-[3rem] overflow-hidden border-8 border-white shadow-3xl grayscale hover:grayscale-0 transition-all duration-1000 relative group"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(settings.address)}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Google Map Riyadh HQ"
              className="relative z-0"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
