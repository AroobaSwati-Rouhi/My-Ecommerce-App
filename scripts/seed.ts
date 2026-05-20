import { MongoClient } from "mongodb";

// Real-world high-value design catalog mock collections
const mockProducts = [
  {
    title: "Aura Minimalist Mechanical Keyboard",
    price: 189.99,
    category: "Electronics",
    description: "Ultra-sleek 75% layout featuring transparent glassmorphic acrylic housing, hot-swappable linear silent switches, and frosted ambient RGB illumination.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Vapor Over-Ear ANC Headphones",
    price: 299.00,
    category: "Electronics",
    description: "Premium high-fidelity audio system packing active cryptographic noise cancellation, luxury memory foam cups, and dual-mode mesh connectivity streams.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Structured Modular Tech Backpack",
    price: 145.00,
    category: "Accessories",
    description: "Waterproof ballistic nylon shell tailored for modern developers. Features dedicated layout pockets for hardware grids and external USB power bridges.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Monochrome Oversized Premium Hoodie",
    price: 85.00,
    category: "Apparel",
    description: "Heavyweight 450GSM loops cotton blend featuring minimalist typography details, drop-shoulder casual aesthetic curves, and luxury matrix finish tags.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Ambient Fluid Desk Mat (Extended)",
    price: 45.50,
    category: "Accessories",
    description: "Ultra-smooth tracking fabric surface showcasing custom violet fluid mesh blob artwork vectors. Armed with clean anti-fray premium stitched borders.",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Aura Horizon Smart Watch Pro",
    price: 349.99,
    category: "Premium",
    description: "Aeronautical grade titanium chassis housing a bezel-less dynamic refresh display, secure identity sync telemetry, and rapid wireless charging modules.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
  }
];

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ Seeding Cancelled: MONGODB_URI environment variable is missing inside configuration vectors.");
    process.exit(1);
  }

  console.log("⏳ Initializing database cluster connection pool...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(); // Extracts target data database name directly from token string
    
    console.log("🧹 Clearing legacy catalog data points...");
    await db.collection("products").deleteMany({});

    console.log(`🚀 Injecting [${mockProducts.length}] premium items into 'products' cluster collection...`);
    const result = await db.collection("products").insertMany(mockProducts);
    
    console.log(`✅ Database Seeding Successful! Registered indices token mapping:`, result.insertedIds);
  } catch (error) {
    console.error("❌ Runtime exception caught during seeding execution loops:", error);
  } finally {
    await client.close();
    console.log("🔌 Cluster pool connectivity severed cleanly.");
    process.exit(0);
  }
}

seedDatabase();