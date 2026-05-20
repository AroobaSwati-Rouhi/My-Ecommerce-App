import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    // Dynamic context parameters execution safely
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json({ message: "Product parameters mismatch or not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server parameter failure", error: error.message },
      { status: 500 }
    );
  }
}