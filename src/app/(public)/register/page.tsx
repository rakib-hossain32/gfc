"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, User, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { cn } from "@/src/lib/utils"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState("")

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Protocols do not match. Confirm password again.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize registration protocol.")
      }

      setIsSuccess(true)
      setTimeout(() => router.push("/login"), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to initialize registration protocol.")
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
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -right-20 size-96 bg-primary/20 rounded-full blur-[120px]" 
        />
      </div>

      {/* --- REGISTRATION CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[540px]"
      >
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-[0_48px_96px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-8 sm:p-12">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {/* Header */}
                  <div className="flex flex-col items-center text-center mb-10">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/20 mb-6">
                      <UserPlus className="size-8" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Portal</h1>
                    <p className="text-white/50 text-sm font-medium">Initialize your architectural credentials</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary">
                          <User className="size-4" />
                        </div>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Architect John Doe" 
                          className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-primary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary">
                          <Mail className="size-4" />
                        </div>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="architect@domain.com" 
                          className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-primary/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Security Key</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary">
                            <Lock className="size-4" />
                          </div>
                          <Input 
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-primary/50"
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
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Confirm Key</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-primary">
                            <Lock className="size-4" />
                          </div>
                          <Input 
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-primary/50"
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
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/10 mt-6 active:scale-[0.98] transition-all"
                    >
                      {isLoading ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Initialize Registration <ArrowRight className="size-4" />
                        </span>
                      )}
                    </Button>
                  </form>

                  {/* Social Login */}
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <button 
                      type="button"
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white hover:bg-white/10 hover:border-white/20 transition-all group active:scale-[0.98]"
                    >
                      <svg className="size-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fast-Track with Google</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <div className="size-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 mb-8">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <h1 className="text-3xl font-black text-white tracking-tight mb-4">Registration Initialized</h1>
                  <p className="text-white/60 text-sm max-w-[280px] leading-relaxed">
                    Account successfully provisioned. Redirecting to authorization portal...
                  </p>
                  <Loader2 className="size-6 text-primary animate-spin mt-10" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-8 bg-white/5 border-t border-white/5 text-center">
              <p className="text-xs font-medium text-white/40">
                Already registered? <Link href="/login" className="text-primary font-black uppercase tracking-widest ml-2 hover:underline">Access Portal</Link>
              </p>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to Headquarters
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
