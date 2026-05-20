import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { orderId, status } = await req.json();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { orderStatus: status }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating status" }, { status: 500 });
  }
}