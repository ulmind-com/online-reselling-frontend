"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/api/axios";
import { CheckCircle2, PlayCircle, Star, Users, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AffiliateLandingPage() {
  const { referralCode } = useParams();
  const router = useRouter();
  
  const [referrer, setReferrer] = useState<{full_name: string, is_active_affiliate: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (referralCode) {
      api.get(`/referrals/info/${referralCode}`)
        .then(res => setReferrer(res.data))
        .catch(err => console.error("Invalid referral code"))
        .finally(() => setLoading(false));
    }
  }, [referralCode]);

  const handleSubscribe = async () => {
    setCheckoutLoading(true);
    try {
      const res = await api.post(`/subscriptions/checkout-session?price_id=price_1Oxxxxxxxxxxxxxxxxxxxxxx&ref=${referralCode}`);
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      // Fallback if not authenticated, redirect to register with ref
      router.push(`/register?ref=${referralCode}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="text-primary-foreground" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">Lumina</span>
          </div>
          <Button onClick={handleSubscribe} className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
            Join Now
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {referrer && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 backdrop-blur-sm"
              >
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {referrer.full_name.charAt(0)}
                </div>
                <span className="text-sm font-medium">You were invited by <span className="text-primary">{referrer.full_name}</span></span>
              </motion.div>
            )}

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            >
              The Exact System to <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Make Money Online
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Get access to the exclusive training method for video editors. Learn the skills, get the system, and start earning recurring commissions today.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg" 
                onClick={handleSubscribe}
                disabled={checkoutLoading}
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                {checkoutLoading ? "Loading..." : "Get Instant Access"}
                {!checkoutLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-secondary/50 backdrop-blur-sm border-border/50 hover:bg-secondary"
              >
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Video
              </Button>
            </motion.div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="text-primary h-5 w-5" /> Cancel anytime</span>
              <span className="flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5" /> Secure payment</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-secondary/20 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-bold tracking-widest text-muted-foreground uppercase mb-12">
              Trusted by 10,000+ creators worldwide
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-8 rounded-3xl relative">
                  <div className="flex text-yellow-500 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 font-medium">
                    "This method completely changed my editing business. The automated affiliate system means I'm making money even when I'm not editing videos. Highly recommended!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/20 rounded-full"></div>
                    <div>
                      <p className="font-bold text-sm">Sarah Jenkins</p>
                      <p className="text-xs text-muted-foreground">Video Editor, $4k/mo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
