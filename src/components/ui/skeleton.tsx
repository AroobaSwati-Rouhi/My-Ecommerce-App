"use client";

import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/50 shadow-md rounded-2xl p-5 flex flex-col gap-4 overflow-hidden relative">
      {/* 🌟 Hardware-Accelerated Shimmer Wave Effect Element */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
      />

      {/* Placeholder Image Square Frame */}
      <div className="aspect-square w-full rounded-xl bg-slate-200/80 animate-pulse" />

      {/* Info Shimmer Fields */}
      <div className="space-y-3 flex-1 justify-between flex flex-col">
        <div className="space-y-2">
          {/* Category Pill Tag Placeholder */}
          <div className="h-4 w-1/4 rounded-md bg-slate-200/80 animate-pulse" />
          {/* Title Placeholder */}
          <div className="h-5 w-3/4 rounded-md bg-slate-200/80 animate-pulse" />
          {/* Subtitle Placeholder */}
          <div className="h-3 w-full rounded-md bg-slate-200/70 animate-pulse" />
          <div className="h-3 w-5/6 rounded-md bg-slate-200/70 animate-pulse" />
        </div>

        {/* Action Button Interaction Placement Placeholder */}
        <div className="h-10 w-full rounded-xl bg-slate-200/80 animate-pulse mt-2" />
      </div>
    </div>
  );
}