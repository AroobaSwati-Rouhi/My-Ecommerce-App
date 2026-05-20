"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Column 1: Brand Matrix (Spans 4) */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="text-xl tracking-tight block">
            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">AURA</span>
            <span className="font-light text-slate-300">MARKET</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            A premium high-performance digital ecosystem scaling cutting-edge tech stacks with beautiful translucent glassmorphic layout frameworks.
          </p>
          {/* Social Network Node Tokens */}
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Twitter</span>
            <span className="text-slate-800">•</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">GitHub</span>
            <span className="text-slate-800">•</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>

        {/* Column 2: Quick Shop Categories (Spans 2) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Collections</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Digital Gears</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Luxury Apparel</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Minimalist Setups</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Exclusive Drops</Link></li>
          </ul>
        </div>

        {/* Column 3: Corporate Support Pillars (Spans 2) */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Assistance</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/my-orders" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Shipping Terms</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Secure Returns</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Dynamic Segment (Spans 4) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Join the Matrix</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive automated notification logs regarding seasonal price drops.
          </p>
          
          {subscribed ? (
            <div className="text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-4 py-2.5 rounded-xl">
              Success! System email token initialized.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@aura.com"
                className="flex-1 bg-slate-900/60 border border-slate-800 focus:border-slate-700 text-slate-300 placeholder-slate-600 px-4 py-2.5 rounded-xl text-xs outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2.5 rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Deep Lower Copyright Strip */}
      <div className="border-t border-slate-900 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} AURA MARKET Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-500 font-mono">Core Engines: ONLINE [V4.TS]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}