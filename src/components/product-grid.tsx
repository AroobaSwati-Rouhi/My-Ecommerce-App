"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import SkeletonCard from "./ui/skeleton";
import { useSession } from "next-auth/react"; // Session import
import Link from "next/link"; // Link import

export default function ProductGrid() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role; // User role check
  
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const categories = ["all", "Electronics", "Apparel", "Accessories", "Premium"];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${category}&search=${search}`);
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      } catch (err) {
        console.error("Failed loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [category, search]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Section */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search luxury products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-xs bg-white/50 backdrop-blur-sm border border-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none"
        />
        
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                category === cat ? "bg-indigo-600 text-white" : "bg-white/60 text-slate-600 border"
              }`}
            >
              {cat}
            </button>
          ))}
          
          {/* 🌟 New Add Product Button (Only for Admin/Seller) */}
          {(role === 'admin' || role === 'seller') && (
            <Link 
              href="/dashboard/seller/add-product" 
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition"
            >
              + Add Product
            </Link>
          )}
        </div>
      </div>

      {/* Catalog Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {products.map((product, index) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 border">
                    ${product.price}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>
                    <h3 className="mt-2 font-semibold text-slate-800 line-clamp-1">{product.title}</h3>
                  </div>
                  <button onClick={() => addToCart(product)} className="w-full premium-btn text-xs py-3">
                    Add To Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}