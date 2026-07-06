"use client";

import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { motion } from "framer-motion";
import { DollarSign, Users, Link as LinkIcon, ExternalLink, PlayCircle, Copy, Check, Activity } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["referral_stats"],
    queryFn: async () => {
      try {
        const res = await api.get("/referrals/stats");
        return res.data;
      } catch (e) {
        return null;
      }
    }
  });

  const { data: courses } = useQuery({
    queryKey: ["my_courses"],
    queryFn: async () => {
      try {
        const res = await api.get("/courses/");
        return res.data;
      } catch (e) {
        return [];
      }
    }
  });

  const referralLink = typeof window !== 'undefined' && stats?.referral_code 
    ? `${window.location.origin}/${stats.referral_code}` 
    : '';

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-96 bg-secondary/20 rounded-3xl" />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to your Dashboard, {user?.full_name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground mt-1">Access your training and manage your affiliate business below.</p>
      </div>

      {/* AFFILIATE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden border border-border"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Earnings</p>
              <h3 className="text-3xl font-bold text-green-500">${stats?.total_earnings?.toFixed(2) || '0.00'}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
              <DollarSign size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Balance</p>
              <h3 className="text-3xl font-bold">${stats?.pending_earnings?.toFixed(2) || '0.00'}</h3>
            </div>
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
              <DollarSign size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Sales</p>
              <h3 className="text-3xl font-bold">{stats?.total_referrals || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Users size={24} />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</p>
              <h3 className="text-3xl font-bold">12.5%</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
              <Activity size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* AFFILIATE LINK SECTION */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="glass-card p-8 rounded-3xl border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <h2 className="text-2xl font-bold mb-2">Your Automated Sales Funnel</h2>
            <p className="text-muted-foreground mb-6">
              Share this exact link on your TikTok, Instagram, or YouTube. Our system tracks everyone who clicks it. When they buy, Stripe automatically sends 20% of the sale to you!
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Your Custom Landing Page URL</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 font-mono text-sm flex items-center gap-2 overflow-hidden">
                    <LinkIcon size={16} className="text-primary shrink-0" />
                    <span className="truncate">{referralLink || 'Generating your unique link...'}</span>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="shrink-0 p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center w-12 h-12"
                    title="Copy Link"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <a 
                    href={referralLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 p-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors flex items-center justify-center w-12 h-12"
                    title="Open Link"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PURCHASED PRODUCT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">Your Purchased Training</h2>
          <div className="space-y-4">
            {courses && courses.length > 0 ? (
              courses.map((course: any) => (
                <Link key={course._id} href={`/dashboard/courses/${course._id}`}>
                  <div className="glass-card p-4 rounded-2xl flex flex-col gap-4 hover:bg-card/80 transition-colors cursor-pointer group border border-border hover:border-primary/50">
                    <div className="relative w-full aspect-video rounded-xl bg-secondary overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                      <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-12 h-12 opacity-90 drop-shadow-lg group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg leading-tight">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="glass-card p-8 rounded-2xl text-center border-dashed border-2">
                <p className="text-muted-foreground font-medium">No training access yet.</p>
                <Link href="/" className="text-primary hover:underline text-sm mt-2 inline-block">Purchase the course to unlock</Link>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
