"use client";

import { useState } from "react";
import { Bell, Loader2, Check } from "lucide-react";

export default function AlertSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/alerts/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setStatus("done");
    else setStatus("idle");
  };

  return (
    <section className="py-16 bg-navy-900 text-white">
      <div className="max-w-xl mx-auto px-4 text-center">
        <Bell className="w-10 h-10 mx-auto mb-4 text-brand-400" />
        <h2 className="text-2xl font-bold mb-2">Never Miss a Property</h2>
        <p className="text-gray-400 mb-6">
          Get notified when new properties matching your criteria hit the market. Be the first to find your dream home.
        </p>

        {status === "done" ? (
          <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
            <Check className="w-5 h-5" /> You&apos;re subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-lg text-gray-900 text-sm outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-72"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
