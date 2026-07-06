"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="text-primary" /> Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Platform usage, traffic, and growth metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl md:col-span-2 min-h-[400px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="bg-secondary/30 border border-border/50 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-secondary/10">
            <div className="text-center text-muted-foreground">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-20" />
              <p>Chart Visualization Area</p>
              <p className="text-xs">Integrate Recharts or Chart.js here</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Activity size={18} />
              </div>
              <h3 className="font-semibold">Platform Engagement</h3>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Daily Active Users</span>
                  <span className="font-medium">1,204</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Course Completion Rate</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                <TrendingUp size={18} />
              </div>
              <h3 className="font-semibold">Top Performing Courses</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Make Money Online for Editors</p>
                  <p className="text-xs text-muted-foreground">145 active students</p>
                </div>
                <span className="text-sm font-bold">$4,350</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
