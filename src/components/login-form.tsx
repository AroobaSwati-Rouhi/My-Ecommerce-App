"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false, // Disabling auto-redirect to execute custom glass animations
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-panel w-full max-w-md p-8 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Welcome <span className="premium-gradient-text">Back</span>
        </h2>
        <p className="text-xs text-slate-400">Enter your secure credentials to sync profile layouts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input Field Layer */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="arooba@example.com"
            className="w-full bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          />
        </div>

        {/* Password Input Field Layer */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Secret Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 border border-rose-100 text-rose-600 text-xs px-4 py-2.5 rounded-xl font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Ergonomic Account Request Interaction Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full premium-btn flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-40"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
          ) : (
            "Authenticate Session"
          )}
        </button>
      </form>

      <div className="text-center text-xs text-slate-400 border-t border-slate-200/40 pt-4">
        Don't have a premium account?{" "}
        <Link href="/register" className="text-indigo-600 font-bold hover:underline">
          Create Account
        </Link>
      </div>
    </motion.div>
  );
}