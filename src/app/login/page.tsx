import LoginForm from "@/components/login-form";

export const metadata = {
  title: "Secure Portal Sign In - AuraMarket",
  description: "NextAuth session token gateway validation encryption interface module.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      {/* Centered Presentation Layer Inject */}
      <LoginForm />
    </div>
  );
}