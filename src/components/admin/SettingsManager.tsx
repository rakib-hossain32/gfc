"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Mail, Phone, MapPin, Share2, Search, Loader2, ShieldCheck, Info, Clock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { SmartPhoneInput } from "@/src/components/ui/phone-input";

export function SettingsManager() {
  const [formData, setFormData] = useState<any>({
    siteName: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    metaDescription: "",
    operationalHours: "",
    startDay: "Sun",
    endDay: "Thu",
    startTime: "08:00 AM",
    endTime: "06:00 PM"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.phone) {
          data.phone = data.phone.replace(/\s/g, "");
        }
        // Parse operational hours to populate dropdowns
        if (data.operationalHours) {
          const match = data.operationalHours.match(/^(\w+)\s*-\s*(\w+):\s*(.+?)\s*-\s*(.+)$/);
          if (match) {
            data.startDay = match[1];
            data.endDay = match[2];
            data.startTime = match[3];
            data.endTime = match[4];
          }
        }
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Configuration synced successfully." });
      } else {
        setMessage({ type: "error", text: "Failed to update core configuration." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "A network error occurred." });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading System Configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-accent uppercase tracking-tighter italic">Core <span className="text-primary italic">Configuration.</span></h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global parameters for Golden First Contracting digital infrastructure</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Brand Identity */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Globe className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-accent uppercase tracking-widest leading-none">Brand Identity</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Public facing identifiers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Official Site Name</label>
              <input
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all"
                placeholder="e.g. Golden First Contracting Management"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contact Protocol (Email)</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl pl-12 pr-6 font-bold tracking-tight transition-all"
                  placeholder="info@goldenfirstcontracting.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <MapPin className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-accent uppercase tracking-widest leading-none">Operational Reach</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Connective parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Secure Hotline</label>
              <div className="light-phone-input">
                <SmartPhoneInput
                  value={formData.phone || ""}
                  onChange={(val) => setFormData({ ...formData, phone: val || "" })}
                  placeholder="+97444000000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Hub Headquarters</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                <input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl pl-12 pr-6 font-bold tracking-tight transition-all"
                  placeholder="Full physical address"
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Operational Timing</label>
              <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Start Day */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">From Day</label>
                    <select
                      value={formData.startDay || "Sun"}
                      onChange={(e) => {
                        const startDay = e.target.value;
                        const endDay = formData.endDay || "Thu";
                        const startTime = formData.startTime || "08:00 AM";
                        const endTime = formData.endTime || "06:00 PM";
                        setFormData({
                          ...formData,
                          startDay,
                          operationalHours: `${startDay} - ${endDay}: ${startTime} - ${endTime}`
                        });
                      }}
                      className="w-full h-12 px-3 rounded-xl bg-white border-2 border-slate-100 focus:border-primary/20 text-sm font-bold transition-all cursor-pointer"
                    >
                      <option value="Sun">Sunday</option>
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                      <option value="Sat">Saturday</option>
                    </select>
                  </div>

                  {/* End Day */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">To Day</label>
                    <select
                      value={formData.endDay || "Thu"}
                      onChange={(e) => {
                        const startDay = formData.startDay || "Sun";
                        const endDay = e.target.value;
                        const startTime = formData.startTime || "08:00 AM";
                        const endTime = formData.endTime || "06:00 PM";
                        setFormData({
                          ...formData,
                          endDay,
                          operationalHours: `${startDay} - ${endDay}: ${startTime} - ${endTime}`
                        });
                      }}
                      className="w-full h-12 px-3 rounded-xl bg-white border-2 border-slate-100 focus:border-primary/20 text-sm font-bold transition-all cursor-pointer"
                    >
                      <option value="Sun">Sunday</option>
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                      <option value="Sat">Saturday</option>
                    </select>
                  </div>

                  {/* Start Time */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Start Time</label>
                    <select
                      value={formData.startTime || "08:00 AM"}
                      onChange={(e) => {
                        const startDay = formData.startDay || "Sun";
                        const endDay = formData.endDay || "Thu";
                        const startTime = e.target.value;
                        const endTime = formData.endTime || "06:00 PM";
                        setFormData({
                          ...formData,
                          startTime,
                          operationalHours: `${startDay} - ${endDay}: ${startTime} - ${endTime}`
                        });
                      }}
                      className="w-full h-12 px-3 rounded-xl bg-white border-2 border-slate-100 focus:border-primary/20 text-sm font-bold transition-all cursor-pointer"
                    >
                      {["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  {/* End Time */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">End Time</label>
                    <select
                      value={formData.endTime || "06:00 PM"}
                      onChange={(e) => {
                        const startDay = formData.startDay || "Sun";
                        const endDay = formData.endDay || "Thu";
                        const startTime = formData.startTime || "08:00 AM";
                        const endTime = e.target.value;
                        setFormData({
                          ...formData,
                          endTime,
                          operationalHours: `${startDay} - ${endDay}: ${startTime} - ${endTime}`
                        });
                      }}
                      className="w-full h-12 px-3 rounded-xl bg-white border-2 border-slate-100 focus:border-primary/20 text-sm font-bold transition-all cursor-pointer"
                    >
                      {["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-primary" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preview</p>
                      <p className="text-sm font-black text-accent">{formData.operationalHours || "Sun - Thu: 08:00 AM - 06:00 PM"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Social & SEO */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Share2 className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-accent uppercase tracking-widest leading-none">Network & Visibility</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">External integration links</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Facebook Identifier</label>
              <input
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full h-12 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 text-xs font-bold transition-all"
                placeholder="URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Instagram Identifier</label>
              <input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full h-12 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 text-xs font-bold transition-all"
                placeholder="URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">LinkedIn Identifier</label>
              <input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full h-12 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl px-4 text-xs font-bold transition-all"
                placeholder="URL"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Search className="size-3" /> Search Engine Logic (Meta Description)
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-3xl p-6 font-bold tracking-tight transition-all resize-none text-xs"
              placeholder="Summarize the site for search indexers..."
            />
          </div>
        </div>

        {/* Feedback Area */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-3xl border flex items-center gap-4 ${message.type === 'success'
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
              : 'bg-red-50 border-red-100 text-red-700'
              }`}
          >
            {message.type === 'success' ? <ShieldCheck className="size-6" /> : <Info className="size-6" />}
            <span className="text-xs font-black uppercase tracking-widest">{message.text}</span>
          </motion.div>
        )}

        {/* Submit Area */}
        <div className="flex justify-end pt-4">
          <Button
            disabled={saving}
            className="h-16 px-12 rounded-2xl bg-primary hover:bg-accent text-white shadow-2xl shadow-primary/20 transition-all font-black uppercase tracking-[0.2em] text-[10px] group"
          >
            {saving ? <Loader2 className="size-5 animate-spin mr-3" /> : <Save className="size-5 mr-3 group-hover:scale-110 transition-transform" />}
            Sync Global Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
