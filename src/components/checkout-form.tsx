"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutForm() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, totalAmount: totalPrice }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        clearCart(); // Clear local storage on transaction success sync
      } else {
        setError(data.message || "Something went wrong during checkout.");
      }
    } catch (err) {
      setError("Network interruption or server communication failure.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel text-center p-12 max-w-md mx-auto space-y-6"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
        <p className="text-sm text-slate-500">Your transaction token has been verified, and stock levels updated in real time.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 🛒 Left Column: Items List Panel (Takes 7 spans) */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-1">Your Shopping Cart</h2>
        
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-12 text-center text-slate-400 text-sm">
              Your bag is currently empty. Add some premium items from the shop catalog.
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-4 flex items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-100" />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-indigo-600 font-bold mt-0.5">${item.price}</p>
                  </div>
                </div>

                {/* Counter & Action Controls Zone (Ergonomic Touch Targets) */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl overflow-hidden p-1">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      －
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      ＋
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-slate-400 hover:text-rose-500 p-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 6.6d-.02.2-.08.38-.2.52ea.5.5 0 0 1-.36.18H9.83a.5.5 0 0 1-.36-.18.61.61 0 0 1-.2-.52L8.92 9m1.42-4.5h4.32m-5.8 0a1 1 0 0 1 1-1h3.32a1 1 0 0 1 1 1m-6.32 0h7.64" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* 💎 Right Column: Luxury Checkout Summary Panel (Takes 5 spans) */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-1">Order Summary</h2>
        <div className="glass-panel p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Premium Shipping</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />
            <div className="flex justify-between text-sm font-bold text-slate-900">
              <span>Total Amount</span>
              <span className="premium-gradient-text">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs px-4 py-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
            className="w-full premium-btn flex items-center justify-center gap-2 py-3.5 disabled:opacity-40 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                Secure Checkout Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}