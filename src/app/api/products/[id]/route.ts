import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Yahan Promise type dena zaroori hai
) {
  try {
    const { id } = await params; // Await params ka hona lazmi hai
    await connectToDatabase();
    
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });
    
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove Product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Yahan bhi Promise type
) {
  try {
    const { id } = await params; // Yahan bhi await params
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}