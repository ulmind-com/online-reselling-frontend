"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Scissors, TrendingUp, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { api } from "@/api/axios";

export default function AffiliateLandingPage({ params }: { params: Promise<{ username: string }> }) {
  const unwrappedParams = use(params);
  const username = unwrappedParams.username;
  const router = useRouter();
  
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ignore static assets or Next.js internals that might fall into this dynamic route
    if (username.startsWith('_next') || username === 'favicon.ico') return;

    api.get(`/referrals/info/${username}`)
      .then(res => {
        setAffiliate(res.data);
        setLoading(false);
      })
      .catch(err => {
        // If not found, redirect to main page
        router.push('/');
      });
  }, [username, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/50 border border-primary/30 p-2 pr-6 rounded-full flex items-center gap-4 shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl overflow-hidden border border-primary/50">
                  {affiliate?.profile_image ? (
                    <img src={affiliate.profile_image} alt={affiliate.full_name} className="w-full h-full object-cover" />
                  ) : (
                    affiliate?.full_name?.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground font-medium">Invited by</p>
                  <p className="font-bold text-foreground">{affiliate?.full_name}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium border-primary/20 text-primary"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                The Secret to $10k/Month Editing
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter max-w-5xl"
              >
                How to Make Money Online as an <span className="text-gradient">Editor</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
              >
                Join {affiliate?.full_name.split(' ')[0]} inside! Stop editing for peanuts on Fiverr. Learn the exact systems to land high-paying clients and scale your editing business.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
              >
                <Link
                  href={`/register?ref=${username}`}
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
              transition={{ duration: 0.7, delay: 0.5 }}
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

      </main>
      
      <Footer />
    </div>
  );
}
