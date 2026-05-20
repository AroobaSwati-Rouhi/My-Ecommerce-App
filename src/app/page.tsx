"use client";

import { motion } from "framer-motion";
import ProductGrid from "@/components/product-grid";
import Link from "next/link";

export default function Home() {
  // Stagger animation orchestration configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <div className="space-y-16 pb-20">
      
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 p-8 sm:p-12 md:p-16 shadow-2xl shadow-indigo-950/20">
        
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -20, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, -20, 0], 
            y: [0, 40, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" 
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl space-y-6"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-indigo-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Ecosystem Live Setup [v4]
          </motion.span>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]"
          >
            Refining the Art of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Digital Commerce
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed font-light"
          >
            Immerse yourself into high-performance web architecture. AuraMarket provides atomic data validation integrity loops combined with silicon-valley design patterns out of the box.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link href="#catalog" className="premium-btn text-xs py-3.5 px-6 shadow-indigo-600/30 flex items-center gap-2 cursor-pointer">
              Explore Collections
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/login" className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white text-xs font-semibold px-6 py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer">
              Verify Gateway Token
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 📦 Faceted Interactive Product Catalog Segment */}
      <div id="catalog" className="space-y-6 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <div className="flex items-center gap-2 text-purple-500 font-mono text-[10px] uppercase tracking-widest font-bold">
              <span> Inventory Catalog</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 mt-1">Trending Products</h2>
          </div>
         
        </div>
        
        <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200/40 to-transparent" />

        {/* Staggered Cards Mesh Grid Connection */}
        <ProductGrid />
      </div>

    </div>
  );
}