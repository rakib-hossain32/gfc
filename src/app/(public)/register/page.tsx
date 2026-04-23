"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, User, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState("")
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Registration failed.")
      setIsSuccess(true)
      setTimeout(() => router.push("/login"), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pb-16 pt-25 bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 mb-6 p-2 overflow-hidden">
            <Image
              src="/logo.png"
              alt="GFC Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-accent tracking-tight">Create account</h1>
          <p className="text-sm text-muted mt-1">Fill in your details to get started</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-accent/40">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted/50" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="h-11 pl-10 rounded-xl bg-slate-50 border-slate-200 text-accent placeholder:text-muted/40 focus:bg-white focus:border-primary/40 focus:ring-0 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-accent/40">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted/50" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="h-11 pl-10 rounded-xl bg-slate-50 border-slate-200 text-accent placeholder:text-muted/40 focus:bg-white focus:border-primary/40 focus:ring-0 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-accent/40">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted/50" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="h-11 pl-10 pr-10 rounded-xl bg-slate-50 border-slate-200 text-accent placeholder:text-muted/40 focus:bg-white focus:border-primary/40 focus:ring-0 transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/40 hover:text-muted transition-colors">
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-accent/40">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted/50" />
                      <Input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="h-11 pl-10 pr-10 rounded-xl bg-slate-50 border-slate-200 text-accent placeholder:text-muted/40 focus:bg-white focus:border-primary/40 focus:ring-0 transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/40 hover:text-muted transition-colors">
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle className="size-3.5 text-red-500 shrink-0" />
                      <p className="text-xs text-red-500">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest shadow-md shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {isLoading
                      ? <Loader2 className="size-4 animate-spin" />
                      : <span className="flex items-center gap-2">Create Account <ArrowRight className="size-3.5" /></span>
                    }
                  </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 px-6">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[10px] text-muted/50 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Google */}
                <div className="p-6 pt-4">
                  <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-2.5 hover:bg-slate-100 transition-all active:scale-[0.98]"
                  >
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-xs font-semibold text-accent/60">Continue with Google</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 flex flex-col items-center text-center gap-3"
              >
                <div className="size-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-base font-black text-accent">Account created!</h2>
                  <p className="text-xs text-muted mt-1">Redirecting to sign in...</p>
                </div>
                <Loader2 className="size-4 text-primary animate-spin mt-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}
