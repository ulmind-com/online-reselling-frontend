"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2 md:col-span-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl font-medium text-left">
            <User size={18} className="text-primary" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 rounded-xl text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 rounded-xl text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
            <Shield size={18} /> Security
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.full_name} 
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email} 
                  disabled
                  className="w-full px-4 py-2.5 bg-secondary/10 border border-border/50 rounded-xl opacity-70 cursor-not-allowed" 
                />
                <p className="text-xs text-muted-foreground">Email addresses cannot be changed.</p>
              </div>
              
              <div className="pt-4">
                <button className="btn-primary py-2.5 px-6 rounded-xl font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Key size={18} /> Password
            </h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-secondary text-foreground py-2.5 px-6 rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
