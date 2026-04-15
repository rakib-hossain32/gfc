"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { cn } from "@/src/lib/utils"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password. Please try again.")
      } else if (result?.ok) {
        window.location.href = "/"
      }
    } catch (err: any) {
      setError("An unexpected system error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* --- BACKGROUND AESTHETICS --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.3] opacity-40 scale-105"
          style={{ backgroundImage: `url('/login-bg.png')` }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-900/80 to-primary/20" />
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 size-96 bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 size-96 bg-accent/10 rounded-full blur-[120px]" 
        />
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-[0_48px_96px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="size-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/20 mb-6"
              >
                <Lock className="size-8" />
              </motion.div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
              <p className="text-white/50 text-sm font-medium">Access your architectural portal</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary transition-colors">
                    <Mail className="size-4" />
                  </div>
                  <Input 
                    type="email" 
                    placeholder="architect@domain.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-2xl focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Password</label>
                  <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary transition-colors">
                    <Lock className="size-4" />
                  </div>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-2xl focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                >
                  <AlertCircle className="size-4 text-red-500 shrink-0" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-400">{error}</p>
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mt-4"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Authorize Access <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-10">
              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <span className="relative px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 bg-transparent">Or fast-track with</span>
              </div>

              <button 
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white hover:bg-white/10 hover:border-white/20 transition-all group active:scale-[0.98]"
              >
                <svg className="size-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorize with Google Intelligence</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/5 border-t border-white/5 text-center">
            <p className="text-xs font-medium text-white/40">
              New lead? <Link href="/register" className="text-primary font-black uppercase tracking-widest ml-2 hover:underline">Apply for Account</Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <Link href="/" className="text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]">
            ← Return to Headquarters
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
