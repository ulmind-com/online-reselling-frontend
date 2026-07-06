"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "@/api/axios";
import { CreditCard, CheckCircle2, AlertCircle, CalendarDays, Loader2 } from "lucide-react";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSub = async () => {
      try {
        const res = await api.get("/subscriptions/current");
        setSubscription(res.data);
      } catch (err) {
        // Suppress error to avoid Next.js dev overlay for expected empty states
      } finally {
        setLoading(false);
      }
    };
    fetchSub();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your billing and subscription plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <CreditCard size={100} />
          </div>
          
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard size={20} className="text-primary"/> Current Plan
          </h3>
          
          <div className="mt-6">
            {subscription ? (
              <>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold capitalize">{subscription.plan}</span>
                  <span className="text-muted-foreground mb-1">plan</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 mb-6">
                  <CheckCircle2 size={14} /> Active
                </div>
                
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Renewal Date</span>
                    <span className="font-medium">
                      {new Date(subscription.current_period_end).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auto-renew</span>
                    <span className="font-medium">
                      {subscription.cancel_at_period_end ? "Off" : "On"}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-medium">
                    Upgrade Plan
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium mb-2">No Active Subscription</h4>
                <p className="text-sm text-muted-foreground mb-6">You are currently on the free tier. Upgrade to access premium content.</p>
                <button className="btn-primary py-2.5 px-6 rounded-xl text-sm font-medium">
                  View Plans
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <CalendarDays size={20} className="text-primary"/> Billing History
            </h3>
            <div className="text-center py-8 text-sm text-muted-foreground">
              No previous billing history found.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
