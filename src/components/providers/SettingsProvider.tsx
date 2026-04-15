"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  metaDescription: string;
  operationalHours: string;
}

const defaultSettings: Settings = {
  siteName: "Golden First Contracting",
  email: "inquiry@goldenfirstcontracting.com", // Updated email address
  phone: "+966 50 000 0000",
  address: "KAFD, Riyadh, Saudi Arabia",
  facebook: "",
  instagram: "",
  linkedin: "",
  metaDescription: "Golden First Contracting - Premium Integrated Facility Management, Cleaning, and Manpower Services in Saudi Arabia.",
  operationalHours: "Sun - Thu: 08:00 AM - 06:00 PM",
};

const SettingsContext = createContext<{
  settings: Settings;
  loading: boolean;
}>({
  settings: defaultSettings,
  loading: true,
});

import { SessionProvider } from "next-auth/react";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          // Merge with defaults to ensure all fields exist
          setSettings({ ...defaultSettings, ...data });
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <SessionProvider>
      <SettingsContext.Provider value={{ settings, loading }}>
        {children}
      </SettingsContext.Provider>
    </SessionProvider>
  );
}

export const useSettings = () => useContext(SettingsContext);
