import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Ensure path is correct

// 🌟 GET: Fetch Products (Public - Sabke liye)
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch", error: error.message }, { status: 500 });
  }
}

// 🌟 POST: Protected (Sirf Seller/Admin ke liye)
export async function POST(request: Request) {
  try {
    // 1. Session check for security
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (!session || (userRole !== 'seller' && userRole !== 'admin')) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
    }

    // 2. Proceed to add product
    await connectToDatabase();
    const body = await request.json();
    const { title, description, price, image, category, stock } = body;

    if (!title || !price || !image || !category || stock === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to create", error: error.message }, { status: 500 });
  }
}