import CheckoutForm from "@/components/checkout-form";

export const metadata = {
  title: "Secure Checkout Dashboard - AuraMarket",
  description: "Cryptographic state payment pipeline checking stock availability triggers.",
};

export default function CheckoutPage() {
  return (
    <div className="space-y-8 py-4">
      <div className="border-b border-slate-200/40 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Review Your <span className="premium-gradient-text">Selection</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Verify your items allocation and finalize the transaction securely.</p>
      </div>

      <CheckoutForm />
    </div>
  );
}