import { Metadata } from "next";
import EarlyAccessForm from "@/components/EarlyAccessForm";

export const metadata: Metadata = {
  title: "Early Access | ApostolicStudy",
  description:
    "Join ApostolicStudy early access to get feature updates and help shape resources for ministers and teachers.",
};

export default function EarlyAccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-16 h-64 w-64 rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-[160px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">Early Access</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Help shape ApostolicStudy</h1>
          <p className="mt-4 text-sm text-white/75 sm:text-base">
            Join early access to hear when new features ship and connect with other ministers prioritising Apostolic doctrine.
            We are especially looking for teachers willing to contribute study notes, commentary entries, reading plans, and other ministry resources.
          </p>
        </div>

        <div className="mt-12">
          <EarlyAccessForm />
        </div>
      </div>
    </main>
  );
}
