"use client";

import { motion } from "framer-motion";
import { Settings, Globe, Mail, Shield, Database, CreditCard } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure platform-wide settings and integrations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-2 md:col-span-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl font-medium text-left">
            <Globe size={18} className="text-primary" /> General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 rounded-xl text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
            <CreditCard size={18} /> Billing & Stripe
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 rounded-xl text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
            <Mail size={18} /> Email Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 rounded-xl text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
            <Shield size={18} /> Security
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6 border-b border-border/50 pb-4">Platform Details</h3>
            
            <div className="space-y-6 max-w-xl">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="Lumina" 
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Support Email</label>
                <input 
                  type="email" 
                  defaultValue="support@lumina.com" 
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Platform Status</label>
                <div className="flex items-center gap-3 p-3 border border-border/50 rounded-xl bg-secondary/20">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium">Accepting new registrations</span>
                  <button className="ml-auto text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-lg transition-colors">
                    Disable
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <button className="btn-primary py-2.5 px-6 rounded-xl font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
            <h3 className="text-lg font-semibold mb-2 text-destructive flex items-center gap-2">
              <Database size={18} /> Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Critical operations that affect the entire platform data.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-xl bg-background">
                <div>
                  <h4 className="font-medium text-sm text-foreground">Maintenance Mode</h4>
                  <p className="text-xs text-muted-foreground mt-1">Take the platform offline for users</p>
                </div>
                <button className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
