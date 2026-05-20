import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "@/components/providers"; // 🌟 Import your wrapper
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraMarket - The Premium Greenfield Experience",
  description: "High performance glassmorphic digital ecosystem scaling layout design patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-50 flex flex-col min-h-screen`}>
        {/* 🌟 Wrap the application with the Session Provider */}
        <Providers>
          <Navbar />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}