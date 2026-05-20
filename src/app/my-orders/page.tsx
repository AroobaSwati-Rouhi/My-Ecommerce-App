import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Order from "@/models/Order"; // Aapka Order Model
import { connectToDatabase } from "@/lib/mongodb";

export default async function MyOrders() {
  const session = await getServerSession(authOptions);
  if (!session) return <p className="text-center mt-10">Please login to track your orders.</p>;

  await connectToDatabase();
  // Sirf login user ke orders fetch karein
  const myOrders = await Order.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {myOrders.length === 0 ? <p>No orders found.</p> : (
        <div className="space-y-4">
          {myOrders.map((order: any) => (
            <div key={order._id} className="p-6 border rounded-xl bg-white shadow-sm flex justify-between">
              <div>
               <p className="font-bold">Order #{order._id.toString().slice(-6)}</p> 
                <p className="text-sm text-slate-500">Total: ${order.totalAmount}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {order.orderStatus.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}