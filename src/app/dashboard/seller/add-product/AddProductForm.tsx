"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();
  // Fields ko API ke mutabiq update kiya hai (title, price, image, category, stock)
  const [formData, setFormData] = useState({ 
    title: "", 
    price: "", 
    description: "", 
    image: "", 
    category: "Electronics", 
    stock: 10 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock.toString())
      }),
    });
    
    if (res.ok) {
      alert("Product added successfully!");
      router.push("/dashboard/seller");
    } else {
      alert("Failed to add product. Check console.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Title" className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        
        <input type="number" placeholder="Price" className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, price: e.target.value})} required />
          
        <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, image: e.target.value})} required />

        <select className="w-full p-3 border rounded-lg" 
          onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
        </select>

        <textarea placeholder="Description" className="w-full p-3 border rounded-lg" rows={3}
          onChange={(e) => setFormData({...formData, description: e.target.value})} required />
        
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">
          Save Product
        </button>
      </form>
    </div>
  );
}