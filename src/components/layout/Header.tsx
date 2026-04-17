"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Phone, Building2, Mail, MapPin, Facebook, Instagram, Linkedin, Globe, ChevronRight, User, Home, Shapes, Info, LogOut, LayoutDashboard,  } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { useSettings } from "@/src/components/providers/SettingsProvider"
import { useSession, signOut } from "next-auth/react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Shapes },
  { name: "Projects", href: "/projects", icon: Building2 },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function Header() {
  const { data: session } = useSession()
  const { settings } = useSettings()
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(false)

  const isAdmin = session?.user?.role === "admin"

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {/* --- TOP STRIP --- */}
      <div className={cn(
        "hidden lg:block bg-slate-950 py-2.5 transition-all duration-700 relative z-60 overflow-hidden",
        scrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      )}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-size-[40px_1px]" />
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Mail className="size-3 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{settings.email}</span>
            </div>
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <MapPin className="size-3 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{settings.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pr-6 border-r border-white/5">
              <a href={settings.facebook || "#"} target="_blank" rel="noopener noreferrer">
                <Facebook className="size-3.5 text-white/30 hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5" />
              </a>
              <a href={settings.instagram || "#"} target="_blank" rel="noopener noreferrer">
                <Instagram className="size-3.5 text-white/30 hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5" />
              </a>
              <a href={settings.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-3.5 text-white/30 hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5" />
              </a>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <Globe className="size-3.5 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:text-primary transition-colors">عربي</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <motion.header
        initial={false}
        animate={{
          y: (scrolled && isDesktop) ? 24 : 0,
          marginTop: (!scrolled && isDesktop) ? "2.5rem" : "0px",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 w-full z-50 flex justify-center transition-[padding] duration-700 ease-[0.16,1,0.3,1] max-w-375 mx-auto",
          scrolled ? "px-4 md:px-8" : "px-0"
        )}
      >
        <motion.div
          initial={false}
          animate={{
            maxWidth: (scrolled && isDesktop) ? "80rem" : "100%",
            paddingTop: scrolled ? (isDesktop ? 10 : 10) : (isDesktop ? 20 : 14),
            paddingBottom: scrolled ? (isDesktop ? 10 : 10) : (isDesktop ? 20 : 14),
            paddingLeft: scrolled ? (isDesktop ? 32 : 16) : (isDesktop ? 24 : 16),
            paddingRight: scrolled ? (isDesktop ? 32 : 16) : (isDesktop ? 24 : 16),
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0)",
            backdropFilter: scrolled ? "blur(32px)" : "blur(0px)",
            borderRadius: (scrolled) ? "2.5rem" : "0px",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "container mx-auto relative will-change-[transform,opacity,backdrop-filter] ",
            scrolled ? "border border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]" : "border-transparent"
          )}
        >
          <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-between relative ">

            {/* 1. Logo */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-4 group relative z-10 w-fit text-left">
                <div className={cn(
                  "bg-primary rounded-xl flex items-center justify-center text-white transition-all duration-500 relative overflow-hidden",
                  scrolled ? "size-10 scale-95" : "size-12 shadow-primary"
                )}>
                  <svg viewBox="0 0 32 32" className={cn("transition-all duration-500 group-hover:scale-110", scrolled ? "size-6" : "size-8")} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6L8 11V24H12V16H20V24H24V11L16 6Z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M16 6L8 11V24H12V16H20V24H24V11L16 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <rect x="15" y="6" width="2" height="18" fill="currentColor" fillOpacity="0.2" />
                    <circle cx="16" cy="11" r="2" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-0 border border-white/10 rounded-xl" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className={cn(
                      "font-black tracking-tighter leading-none text-accent transition-all duration-500",
                      scrolled ? "text-lg xl:text-xl" : "text-xl xl:text-2xl"
                    )}>
                      {settings.siteName.split(' ')[0] || "RIYADH"}
                    </span>
                    <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                  <span className="text-[8px] xl:text-[9px] font-black tracking-[0.5em] text-primary uppercase leading-none mt-1.5 opacity-80">
                    {settings.siteName.split(' ').slice(1).join(' ') || "Integrated Excellence"}
                  </span>
                </div>
              </Link>
            </div>

            {/* 2. Nav Links */}
            <nav className={cn(
              "hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-500",
              scrolled ? "bg-slate-900/5" : "bg-white/5 backdrop-blur-md border border-white/10"
            )}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest xl:tracking-[0.2em] px-3 xl:px-7 py-3 rounded-full transition-all duration-500 relative group overflow-hidden",
                    pathname === item.href ? "text-white" : "text-accent/60 hover:text-accent"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navActiveGlow"
                      className="absolute inset-0 bg-accent rounded-full z-0 shadow-lg shadow-accent/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* 3. Right Actions */}
            <div className="flex items-center justify-end gap-3 xl:gap-8 relative z-10 pl-4">
              <div className="hidden lg:flex items-center gap-3 xl:gap-5">

                {/* Profile/Login Section */}
                <div className="relative z-60">
                  <AnimatePresence mode="wait">
                    {!session ? (
                      <motion.div
                        key="login-btn"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <Link href="/login" className={cn(
                          "flex items-center justify-center border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all font-black uppercase text-[9px] xl:text-[10px] tracking-widest xl:tracking-[0.2em]",
                          scrolled ? "size-11 rounded-full" : "h-11 px-6 rounded-full"
                        )}>
                          <User className={cn(scrolled ? "size-5" : "size-3.5 mr-2")} />
                          {!scrolled && <span>Login</span>}
                        </Link>
                      </motion.div>
                    ) : isAdmin ? (
                      /* Admin: dropdown with panel + sign out */
                      <motion.div
                        key="admin-profile"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative"
                      >
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className={cn(
                            "flex items-center gap-2 border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 relative group",
                            scrolled ? "size-11 rounded-full" : "px-2 pr-4 h-11 rounded-full"
                          )}
                        >
                          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-black overflow-hidden shadow-sm">
                            {session.user?.image ? (
                              <Image src={session.user.image} alt="User" width={32} height={32} className="size-full object-cover" />
                            ) : (
                              <span className="text-xs">{session.user?.name?.[0] || 'A'}</span>
                            )}
                          </div>
                          {!scrolled && (
                            <div className="flex flex-col items-start">
                              <span className="text-[10px] font-black text-accent uppercase leading-none">{session.user?.name?.split(' ')[0]}</span>
                              <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-wider opacity-60">Admin</span>
                            </div>
                          )}
                        </button>

                        <AnimatePresence mode="popLayout">
                          {showUserMenu && (
                            <>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                                onClick={() => setShowUserMenu(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                className="absolute right-0 top-[calc(100%+12px)] w-60 bg-white rounded-4xl border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-3 z-60"
                              >
                                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                                  <p className="text-[9px] font-black uppercase text-accent/40 tracking-[0.2em] mb-1">Admin Session</p>
                                  <p className="text-[11px] font-black text-accent truncate">{session.user?.email}</p>
                                </div>
                                <div className="space-y-1">
                                  <Link
                                    href="/admin"
                                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-accent group"
                                    onClick={() => setShowUserMenu(false)}
                                  >
                                    <div className="size-8 rounded-xl bg-slate-100 flex items-center justify-center text-accent/40 group-hover:bg-primary group-hover:text-white transition-all">
                                      <LayoutDashboard className="size-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Admin Panel</span>
                                  </Link>
                                  <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 text-red-500 group"
                                  >
                                    <div className="size-8 rounded-xl bg-red-100/50 flex items-center justify-center text-red-600/60 group-hover:bg-red-500 group-hover:text-white transition-all">
                                      <LogOut className="size-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      /* Regular user: direct link to profile, no dropdown */
                      <motion.div
                        key="user-profile"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Link
                          href="/profile"
                          className={cn(
                            "flex items-center gap-2 border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300",
                            scrolled ? "size-11 rounded-full" : "px-2 pr-4 h-11 rounded-full"
                          )}
                        >
                          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-black overflow-hidden shadow-sm">
                            {session.user?.image ? (
                              <Image src={session.user.image} alt="User" width={32} height={32} className="size-full object-cover" />
                            ) : (
                              <span className="text-xs">{session.user?.name?.[0] || 'U'}</span>
                            )}
                          </div>
                          {!scrolled && (
                            <div className="flex flex-col items-start">
                              <span className="text-[10px] font-black text-accent uppercase leading-none">{session.user?.name?.split(' ')[0]}</span>
                              <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-wider opacity-60">Profile</span>
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button variant="default" size="lg" className="rounded-full h-11 px-6 xl:px-10 shadow-xl shadow-primary/10" asChild>
                  <Link href="/contact" className="gap-2.5 text-[10px] font-black uppercase tracking-widest flex items-center group">
                    Initial Quote <ChevronRight className="size-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center gap-2">
                {!session ? (
                  <Button variant="outline" size="icon" className="size-10 rounded-2xl active:scale-90 border-accent/10" asChild>
                    <Link href="/login">
                      <User className="size-5 text-accent" />
                    </Link>
                  </Button>
                ) : isAdmin ? (
                  /* Admin: dropdown */
                  <div className="relative">
                    <button
                      onClick={() => setShowMobileMenu(!showMobileMenu)}
                      className={cn(
                        "size-10 rounded-2xl flex items-center justify-center active:scale-90 relative border transition-all",
                        showMobileMenu ? "border-primary bg-primary/10" : "border-primary/30 bg-primary/5"
                      )}
                    >
                      <div className="size-7 rounded-xl bg-primary flex items-center justify-center text-white font-black overflow-hidden">
                        {session.user?.image ? (
                          <Image src={session.user.image} alt="User" width={28} height={28} className="size-full object-cover" />
                        ) : (
                          <span className="text-[10px]">{session.user?.name?.[0] || 'A'}</span>
                        )}
                      </div>
                      <div className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary animate-pulse" />
                    </button>

                    <AnimatePresence>
                      {showMobileMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white rounded-3xl border border-slate-100 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.15)] p-2.5 z-60"
                        >
                          <div className="px-3 py-2 mb-1.5 border-b border-slate-50">
                            <p className="text-[9px] font-black uppercase text-accent/30 tracking-[0.2em]">Admin Session</p>
                            <p className="text-[11px] font-black text-accent truncate mt-0.5">{session.user?.name}</p>
                            <p className="text-[9px] font-medium text-accent/40 truncate">{session.user?.email}</p>
                          </div>
                          <div className="space-y-0.5">
                            <Link
                              href="/admin"
                              className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 text-accent group"
                              onClick={() => setShowMobileMenu(false)}
                            >
                              <div className="size-7 rounded-xl bg-slate-100 flex items-center justify-center text-accent/40 group-hover:bg-primary group-hover:text-white transition-all">
                                <LayoutDashboard className="size-3.5" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest">Admin Panel</span>
                            </Link>
                            <button
                              onClick={() => { signOut(); setShowMobileMenu(false) }}
                              className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-red-50 text-red-500 group"
                            >
                              <div className="size-7 rounded-xl bg-red-100/50 flex items-center justify-center text-red-500/60 group-hover:bg-red-500 group-hover:text-white transition-all">
                                <LogOut className="size-3.5" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Regular user: direct link to profile */
                  <Link
                    href="/profile"
                    className="size-10 rounded-2xl flex items-center justify-center border border-primary/30 bg-primary/5 active:scale-90"
                  >
                    <div className="size-7 rounded-xl bg-primary flex items-center justify-center text-white font-black overflow-hidden">
                      {session.user?.image ? (
                        <Image src={session.user.image} alt="User" width={28} height={28} className="size-full object-cover" />
                      ) : (
                        <span className="text-[10px]">{session.user?.name?.[0] || 'U'}</span>
                      )}
                    </div>
                  </Link>
                )}

                <a href={`tel:${settings.phone}`} className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary active:scale-90">
                  <Phone className="size-5" />
                </a>
              </div>

            </div>
          </div>
        </motion.div>

         {/* Bottom Nav Mobile */}
        <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
          <motion.nav
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/50 backdrop-blur-[10px] backdrop-saturate-280 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-[1.75rem] py-1 px-2 flex justify-between items-center"
            style={{
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 flex-1 py-0.5 transition-all",
                    isActive ? "text-primary" : "text-accent/30 hover:text-accent/60"
                  )}
                >
                  <div className={cn(
                    "size-7 rounded-lg flex items-center justify-center transition-all",
                    isActive ? "bg-primary/10 text-primary scale-105" : "text-accent/40"
                  )}>
                    <Icon className="size-5" />
                  </div>
                  <span className={cn("text-[8.5px] font-black uppercase tracking-wide", isActive ? "opacity-100" : "opacity-50")}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </motion.nav>
        </div>
      </motion.header>
    </>
  )
}
