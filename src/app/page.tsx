"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle, Scissors, TrendingUp, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium border-primary/20 text-primary"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                The Secret to $10k/Month Editing
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter max-w-5xl"
              >
                How to Make Money Online as an <span className="text-gradient">Editor</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
              >
                Stop editing for peanuts on Fiverr. Learn the exact systems to land high-paying clients, scale your editing business, and earn passive income by reselling this exact system.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
              >
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:scale-105"
                >
                  Get Instant Access - $100
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <p className="text-sm font-medium text-muted-foreground">
                  + Become an automatic affiliate and keep 20% of every sale!
                </p>
              </motion.div>
            </div>
            
            {/* Hero Video Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-20 mx-auto max-w-5xl relative"
            >
              <div className="rounded-2xl md:rounded-[2rem] border border-border/50 glass-card p-2 md:p-4 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-black relative aspect-video flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/50">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                    <span className="font-bold text-xl text-white drop-shadow-md">Watch the Free Training</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHAT YOU GET SECTION */}
        <section id="features" className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What's Inside The Program?</h2>
              <p className="text-muted-foreground text-xl">Everything you need to turn your editing skills into a highly profitable online business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: Scissors, 
                  title: "Editing Mastery", 
                  desc: "Learn the high-retention editing techniques that YouTubers and brands pay premium prices for." 
                },
                { 
                  icon: TrendingUp, 
                  title: "Client Acquisition", 
                  desc: "Copy-paste templates to pitch, close, and onboard clients paying $2,000+ per month." 
                },
                { 
                  icon: DollarSign, 
                  title: "Reseller Rights", 
                  desc: "Instantly become an affiliate. Sell this exact course to others and earn 20% on auto-pilot." 
                },
                { 
                  icon: Users, 
                  title: "Auto-Funnels", 
                  desc: "You get a personalized landing page instantly generated for you to start selling immediately." 
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-8 rounded-2xl hover:bg-card/80 transition-colors"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* HOW IT WORKS SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold tracking-tight">The 3-Step Reseller System</h2>
                <p className="text-xl text-muted-foreground">Not only will you learn how to make money editing, but the platform itself becomes your income source.</p>
                
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Join & Learn", desc: "Purchase the course, log in to your dashboard, and master the high-income skill of video editing." },
                    { step: "2", title: "Get Your Landing Page", desc: "We automatically generate a high-converting landing page just for you (e.g. yoursite.com/yourname)." },
                    { step: "3", title: "Share & Earn", desc: "Share your link on TikTok or IG Reels. When someone buys, Stripe automatically sends 20% directly to your bank account." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xl font-bold text-primary">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="glass-card border border-border/50 rounded-3xl p-8 relative shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="font-semibold text-lg text-muted-foreground">Automatic Payout Split</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-bold border border-green-500/30">Stripe Verified</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 rounded-xl bg-background border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">You</div>
                          <span className="font-semibold">Reseller Commission</span>
                        </div>
                        <span className="text-xl font-bold text-primary">$20.00</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">C</div>
                          <span className="font-semibold text-muted-foreground">Creator (Owner)</span>
                        </div>
                        <span className="text-xl font-bold text-muted-foreground">$70.00</span>
                      </div>

                      <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">P</div>
                          <span className="font-semibold text-muted-foreground">Platform Fee</span>
                        </div>
                        <span className="text-xl font-bold text-muted-foreground">$10.00</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 text-center text-sm text-muted-foreground">
                      Payments are processed and split instantly via Stripe Connect. No manual payouts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
