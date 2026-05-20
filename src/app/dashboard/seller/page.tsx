"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders
    fetch("/api/orders/all")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await fetch("/api/orders/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
    window.location.reload(); // Refresh to reflect status change
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header with Add Product Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Seller Portal</h1>
          <p className="text-slate-500 text-sm">Manage your orders and inventory</p>
        </div>
        <Link 
          href="/dashboard/seller/add-product" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          + Add Product
        </Link>
      </div>

      {/* Orders Section */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <h2 className="text-lg font-bold mb-6 text-slate-700">Recent Orders</h2>
        
        {orders.length === 0 ? (
          <p className="text-center py-10 text-slate-400">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order._id} className="p-5 border border-slate-200 rounded-2xl bg-white flex justify-between items-center hover:shadow-md transition-all">
                <div>
                  <p className="font-bold text-slate-800">Order #{order._id.slice(-6)}</p>
                  <p className="text-xs text-slate-500">
                    Status: <span className="font-bold text-indigo-600">{order.orderStatus}</span>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(order._id, "shipped")} 
                    className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-100 transition"
                  >
                    Ship
                  </button>
                  <button 
                    onClick={() => updateStatus(order._id, "delivered")} 
                    className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-lg hover:bg-green-100 transition"
                  >
                    Deliver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}