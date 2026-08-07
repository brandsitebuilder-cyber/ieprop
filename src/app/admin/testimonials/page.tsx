"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: number; client_name: string; location: string; rating: number; content: string; is_active: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/testimonials/list");
    if (res.ok) setTestimonials(await res.json());
  };

  useEffect(() => { load(); }, []);

  const toggleActive = async (t: Testimonial) => {
    await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, is_active: !t.is_active }),
    });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-sm">i</Link>
            <h1 className="font-semibold text-gray-900">Testimonials</h1>
          </div>
          <Link href="/admin/testimonials/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
            <Plus className="w-4 h-4" /> Add Testimonial
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className={`bg-white rounded-xl border p-5 ${t.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm text-gray-700 italic mb-2">&ldquo;{t.content}&rdquo;</p>
                  <p className="text-sm font-medium text-gray-900">{t.client_name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(t)} className={`text-xs px-2 py-1 rounded ${t.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {t.is_active ? "Visible" : "Hidden"}
                  </button>
                  <button onClick={() => remove(t.id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-center text-gray-400 py-12">No testimonials yet. Add some client reviews to display on the homepage.</p>
          )}
        </div>
      </main>
    </div>
  );
}
