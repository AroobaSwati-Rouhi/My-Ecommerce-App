"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/cart-drawer";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  
  // Debugging log for session check
  useEffect(() => {
    console.log("Current User Session Data:", session);
  }, [session]);

  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted 
    ? cart.reduce((acc, item) => acc + item.quantity, 0) 
    : 0;

  // Helper to check if user has access to Seller Portal
  const userRole = (session?.user as any)?.role;
  const canAccessSellerPortal = userRole === "seller" || userRole === "admin";

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-xl border-b border-slate-200/50 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl tracking-tight shrink-0">
                <span className="premium-gradient-text">AURA</span>
                <span className="font-light text-slate-500">MARKET</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)} 
                className="relative p-2.5 hover:bg-slate-100/60 rounded-xl transition-colors group cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375 0 1 1-.75 0 .375 0 0 1 .75 0Zm7.5 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Z" />
                </svg>
                {mounted && totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 border border-indigo-200/60 flex items-center justify-center text-xs font-bold text-indigo-700 cursor-pointer"
                >
                  {session?.user?.name?.[0] || "U"}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-white border border-slate-200/80 shadow-xl rounded-xl p-1.5 space-y-0.5 z-50 text-xs"
                    >
                      {session ? (
                        <>
                          <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 truncate">
                            {session.user?.email}
                          </div>
                          
                          {/* Updated condition here */}
                          {canAccessSellerPortal && (
                            <a 
    href="/dashboard/seller" 
    className="block px-3 py-2 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg"
    onClick={() => {
      // Force reload agar link kaam nahi kar raha
      window.location.href = "/dashboard/seller";
    }}
  >
    Seller Portal
  </a>
                          )}
                          
                          {/* <Link href="/dashboard" className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">Dashboard</Link> */}
                          <button onClick={() => signOut()} className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-medium cursor-pointer">End Session</button>
                        </>
                      ) : (
                        <Link href="/login" className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">Login / Register</Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}