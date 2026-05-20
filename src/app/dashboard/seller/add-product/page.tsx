import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddProductForm from "./AddProductForm";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // Role check: Agar admin ya seller nahi hai, toh redirect karo
  const role = (session?.user as any)?.role;

  if (!session || (role !== 'seller' && role !== 'admin')) {
    redirect("/login"); 
  }

  return <AddProductForm />;
}