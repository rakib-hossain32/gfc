import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css"; 
import { cn } from "@/src/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

import clientPromise from "@/src/lib/mongodb";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const settings = await db.collection("settings").findOne({});

    return {
      title: settings?.siteName || "Golden First Contracting",
      description: settings?.metaDescription || "Golden First Contracting - Premium Integrated Facility Management, Cleaning, and Manpower Services.",
    };
  } catch (error) {
    return {
      title: "Golden First Contracting",
      description: "Golden First Contracting - Premium Integrated Facility Management, Cleaning, and Manpower Services.",
    };
  }
}

import { SettingsProvider } from "@/src/components/providers/SettingsProvider";
import { AuthProvider } from "@/src/components/providers/AuthProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          jakarta.variable
        )}
      >
        <AuthProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
