"use client";

import { useActionState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

type FormState = {
  success?: boolean;
  error?: string;
};

async function submitInquiry(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields (name, email, and message)." };
  }

  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.error || "Failed to send inquiry. Please try again." };
    }

    return { success: true };
  } catch {
    return { error: "Network error. Please try again." };
  }
}

const initialState: FormState = {};

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-green-50 text-lg max-w-2xl mx-auto">
            Have a question or ready to start your property journey? Get in touch and we&apos;ll respond promptly.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {state.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mx-auto mb-4">
                    <Send size={20} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-green-600">
                    Thank you for your inquiry. We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-5">
                  {state.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                      {state.error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900"
                      placeholder="+27 12 345 6789"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-gray-900 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {pending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-brand mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <a
                      href="tel:+27115686678"
                      className="text-sm text-gray-500 hover:text-brand"
                    >
                      +27 11 568 6678
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-brand mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <a
                      href="mailto:info@ieprop.co.za"
                      className="text-sm text-gray-500 hover:text-brand"
                    >
                      info@ieprop.co.za
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-500">
                      Johannesburg, Gauteng, South Africa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Our Location</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Map placeholder</p>
                  <p className="text-xs text-gray-400 mt-1">Johannesburg, Gauteng</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday – Friday</span>
                  <span className="text-gray-700">8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-gray-700">9:00 AM – 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="text-gray-700">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
