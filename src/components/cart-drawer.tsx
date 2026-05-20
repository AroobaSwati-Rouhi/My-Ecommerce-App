"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalAmount: totalPrice
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully!");
        clearCart(); // Cart khali kar do
        onClose();   // Drawer band kar do
        router.push("/dashboard"); // Customer dashboard par le jao
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      alert("Transaction pipeline failure.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white/90 backdrop-blur-2xl border-l border-slate-200/60 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">Shopping Bag</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-500 flex items-center justify-center transition-colors cursor-pointer text-xs">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs">Your cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item._id} className="p-3 bg-slate-50/60 border border-slate-200/40 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg border bg-white" />
                      <div>
                        <h4 className="font-semibold text-xs text-slate-800">{item.title}</h4>
                        <p className="text-[11px] font-bold text-indigo-600">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg scale-90">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-6 h-6 text-[10px] font-bold text-slate-500">－</button>
                        <span className="w-6 text-center text-[11px] font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-6 h-6 text-[10px] font-bold text-slate-500">＋</button>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="text-slate-400 hover:text-rose-500 p-1">✕</button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-500">Subtotal</span>
                <span className="font-black text-indigo-600 text-base">${totalPrice.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0 || loading}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-indigo-700 disabled:bg-slate-300 transition-all cursor-pointer"
              >
                {loading ? "Processing..." : "Place Order Now"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}