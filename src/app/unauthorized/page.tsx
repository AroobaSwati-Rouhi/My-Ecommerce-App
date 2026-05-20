import Link from "next/link"; 
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-black">Access Denied 🚫</h1>
      {/* <p className="text-slate-500">Aap is page ko view karne ke liye authorized nahi hain.</p> */}
      <Link href="/" className="mt-4 text-indigo-600 underline">Home</Link>
    </div>
  );
}