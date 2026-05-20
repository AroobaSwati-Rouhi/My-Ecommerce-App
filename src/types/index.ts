export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "processing" | "shipped" | "delivered";
  createdAt: string;
}