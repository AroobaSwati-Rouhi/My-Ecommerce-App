import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function DashboardPage() {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session) return <div className="p-10 text-center">Please login to view your orders.</div>;

  const userId = (session.user as any)?.id;
const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
  const steps = ["processing", "shipped", "delivered"];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-black mb-8">My Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => {
          const currentStepIndex = steps.indexOf(order.orderStatus);
          return (
            <div key={order._id.toString()} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
              {/* Header: ID & Total */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                  <p className="font-mono text-sm text-slate-800">{order._id.toString().slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                  <p className="font-black text-indigo-600">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              {/* Items List (NEW: Details Section) */}
              <div className="mb-6 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Order Items</p>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700">{item.title}</p>
                      <p className="text-[10px] text-slate-500">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking Progress */}
              <div className="relative pt-4 border-t border-slate-100">
                <div className="flex justify-between mb-2">
                  {steps.map((step, index) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${index <= currentStepIndex ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                      <span className="text-[9px] uppercase font-bold text-slate-400 mt-1">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-slate-100 rounded-full">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}