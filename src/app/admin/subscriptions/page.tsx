"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "@/api/axios";
import { CreditCard, Search, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";
import { format } from "date-fns";

export default function AdminSubscriptionsPage() {
  const [loading, setLoading] = useState(false);
  const [stats] = useState({
    totalActive: 245,
    monthlyRevenue: 12450,
    churnRate: "2.4%",
    newThisMonth: 32
  });

  // Using dummy data for admin view as we don't have a dedicated get all subscriptions API yet
  const [subscriptions] = useState([
    { id: "sub_1", user_email: "arnab@example.com", plan: "pro", status: "active", amount: 49, created_at: new Date().toISOString() },
    { id: "sub_2", user_email: "test@example.com", plan: "basic", status: "active", amount: 19, created_at: new Date().toISOString() },
    { id: "sub_3", user_email: "user@demo.com", plan: "pro", status: "canceled", amount: 49, created_at: new Date(Date.now() - 30*24*60*60*1000).toISOString() },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground mt-2">
          Manage platform subscriptions, billing, and revenue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> +12%
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Active Subscribers</p>
          <h3 className="text-3xl font-bold mt-1">{stats.totalActive}</h3>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
              <CreditCard size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> +8.4%
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">MRR</p>
          <h3 className="text-3xl font-bold mt-1">${stats.monthlyRevenue}</h3>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Users size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              +32
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">New This Month</p>
          <h3 className="text-3xl font-bold mt-1">{stats.newThisMonth}</h3>
        </div>
        
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center text-destructive">
              <CreditCard size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              <ArrowDownRight size={14} className="mr-1" /> -0.2%
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Churn Rate</p>
          <h3 className="text-3xl font-bold mt-1">{stats.churnRate}</h3>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">Recent Subscriptions</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by email..." 
              className="w-full pl-9 pr-4 py-2 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/20">
              <tr>
                <th className="px-6 py-4 font-medium">User Email</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4 font-medium">{sub.user_email}</td>
                  <td className="px-6 py-4 capitalize">
                    <span className="bg-secondary px-2.5 py-1 rounded-lg text-xs font-medium">{sub.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      sub.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">${sub.amount}/mo</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {format(new Date(sub.created_at), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
