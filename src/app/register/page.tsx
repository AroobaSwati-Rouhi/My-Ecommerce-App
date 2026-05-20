"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";


export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setError("");

    try {
      // 🌟 Direct internal API deployment registration flow pipeline
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration parameter validation failed.");
      } else {
        // Automatically route user to login upon success
        router.push("/login");
      }
    } catch (err) {
      setError("Network sync failure during user provisioning loop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel w-full max-w-md p-8 space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Create an <span className="premium-gradient-text">Account</span>
          </h2>
          <p className="text-xs text-slate-400">Join our ecosystem to unleash premium glass-morphic catalogs.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complete Name Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Arooba Swati"
              className="w-full bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
  <label className="text-[11px] font-bold text-slate-500 uppercase">Account Type</label>
  <select 
    onChange={(e) => setRole(e.target.value)} 
    className="w-full bg-white/50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm"
  >
    <option value="customer">Customer</option>
    <option value="seller">Seller</option>
  </select>
</div>

          {/* Email Address Input */}
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

          {/* Secret Password Security Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Create Password</label>
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

          {/* Account Provisioning Button Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full premium-btn flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-40"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
            ) : (
              "Initialize New Account"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 border-t border-slate-200/40 pt-4">
          Already part of the network?{" "}
          <Link href="/login" className="text-indigo-600 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}