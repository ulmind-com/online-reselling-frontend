"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { motion } from "framer-motion";
import { Copy, DollarSign, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function EarningsDashboard() {
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["referral_stats"],
    queryFn: async () => {
      const res = await api.get("/referrals/stats");
      return res.data;
    }
  });

  const { data: commissions, isLoading: commissionsLoading } = useQuery({
    queryKey: ["commissions"],
    queryFn: async () => {
      const res = await api.get("/referrals/commissions");
      return res.data;
    }
  });

  const withdrawMutation = useMutation({
    mutationFn: async (amount: number) => {
      const res = await api.post("/referrals/withdraw", { amount });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["referral_stats"] });
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to submit withdrawal request.");
    }
  });

  const { data: connectStatus, isLoading: connectLoading } = useQuery({
    queryKey: ["stripe_connect_status"],
    queryFn: async () => {
      const res = await api.get("/connect/status");
      return res.data;
    }
  });

  const onboardMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/connect/onboard");
      return res.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to start Stripe onboarding.");
    }
  });

  const referralLink = typeof window !== "undefined" 
    ? `${window.location.origin}/join/${stats?.referral_code}` 
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Landing page link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = () => {
    if (stats?.total_earnings > 0) {
      withdrawMutation.mutate(stats.total_earnings);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Earnings & Referrals</h1>
        <p className="text-muted-foreground mt-1">Track your affiliate commissions and payouts.</p>
      </div>

      {!connectLoading && (!connectStatus?.is_connected || !connectStatus?.charges_enabled) && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-1">Set up automated payouts</h3>
            <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">Connect your bank account securely with Stripe to receive your commissions automatically.</p>
          </div>
          <Button 
            onClick={() => onboardMutation.mutate()} 
            disabled={onboardMutation.isPending}
            className="bg-yellow-500 hover:bg-yellow-600 text-white whitespace-nowrap"
          >
            {onboardMutation.isPending ? "Loading..." : "Connect with Stripe"}
          </Button>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primary flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold mb-2">Your Personal Landing Page</h3>
          <p className="text-sm text-muted-foreground mb-4">Share this link with your audience. When they subscribe, you earn 30% recurring commission.</p>
          <div className="flex items-center gap-2 max-w-lg w-full">
            <div className="bg-secondary/50 px-4 py-3 rounded-xl flex-1 truncate font-mono text-sm border border-border">
              {statsLoading ? "Loading..." : referralLink}
            </div>
            <Button onClick={handleCopy} className="rounded-xl shrink-0" variant="secondary">
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Earned</p>
              <h3 className="text-3xl font-bold text-green-500">${stats?.total_earnings?.toFixed(2) || "0.00"}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 text-sm flex items-center justify-between text-muted-foreground">
             <span>Payout Method</span>
             <span className="font-medium text-foreground">
               {connectStatus?.charges_enabled ? "Auto (Stripe)" : "Manual"}
             </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Next Payout</p>
              <h3 className="text-3xl font-bold">${stats?.pending_earnings?.toFixed(2) || "0.00"}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Transferred automatically</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Subscriptions</p>
              <h3 className="text-3xl font-bold">{stats?.total_referrals || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-accent/10 text-accent-foreground">
              <Users size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Active referrals</p>
        </motion.div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden mt-8 border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Commission History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Referral</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionsLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : commissions?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                    No commissions earned yet. Share your landing page to start earning!
                  </td>
                </tr>
              ) : (
                commissions?.map((commission: any) => (
                  <tr key={commission._id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors last:border-0">
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(commission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      Subscription Purchase
                    </td>
                    <td className="px-6 py-4 font-bold text-green-500">
                      +${commission.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        commission.status === 'approved' ? 'bg-green-500/10 text-green-500' : 
                        commission.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
