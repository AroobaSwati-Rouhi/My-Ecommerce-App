import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    try {
  await connectToDatabase();
  console.log("Database connected successfully!"); // Terminal mein dekhein yeh print ho raha hai ya nahi?
} catch (dbError) {
  console.error("DB Connection Failed:", dbError);
  return NextResponse.json({ message: "Database connection error" }, { status: 500 });
}

    // 1. Session Verification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized access, please login first" }, { status: 401 });
    }

    const body = await request.json();
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Cart data layer cannot be empty" }, { status: 400 });
    }

    // 2. Inventory Integrity Validation
    let calculatedTotal = 0;
    
    for (const item of items) {
      const dbProduct = await Product.findById(item._id);
      if (!dbProduct) {
        return NextResponse.json({ message: `Product ${item.title} no longer exists` }, { status: 404 });
      }
      
      if (dbProduct.stock < item.quantity) {
        return NextResponse.json({ message: `Insufficient inventory for ${item.title}` }, { status: 400 });
      }
      
      calculatedTotal += dbProduct.price * item.quantity;
    }

    // 3. Stock Allocation
    for (const item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // 4. Create Order (Schema compliant)
    const newOrder = await Order.create({
      userId: (session.user as any).id, // Ensure this matches your session object
      items: items.map((item: any) => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image // Ensure this is coming from frontend
      })),
      totalAmount: calculatedTotal,
      paymentStatus: "paid",
      orderStatus: "processing",
    });

    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });

  } catch (error: any) {
    console.error("ORDER API CRASHED:", error);
    return NextResponse.json(
      { message: "Transaction pipeline structural failure", error: error.message },
      { status: 500 }
    );
  }
}