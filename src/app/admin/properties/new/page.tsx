"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", type: "sale", status: "active",
    price: "", bedrooms: "", bathrooms: "", parking: "",
    floor_size: "", erf_size: "", location: "", description: "",
    features: "",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const generateSlug = () => {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    update("slug", slug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        price: Number(form.price),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        parking: form.parking ? Number(form.parking) : null,
        floor_size: form.floor_size ? Number(form.floor_size) : null,
        erf_size: form.erf_size ? Number(form.erf_size) : null,
        features: form.features ? form.features.split("\n").map((f: string) => f.trim()).filter(Boolean) : [],
      }),
    });
    if (res.ok) router.push("/admin/properties");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/admin/properties" className="text-sm text-gray-500 hover:text-gray-700">&larr; Back</Link>
          <h1 className="font-semibold text-gray-900">New Property</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={v => update("title", v)} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <div className="flex gap-2">
                <input value={form.slug} onChange={e => update("slug", e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                <button type="button" onClick={generateSlug} className="px-3 py-2 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">Generate</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={e => update("type", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
                <option value="sale">For Sale</option>
                <option value="rent">To Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => update("status", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500">
                <option value="active">Active</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <Field label={form.type === "rent" ? "Price (R/month)" : "Price (R)"} value={form.price} onChange={v => update("price", v)} type="number" required />
            <Field label="Bedrooms" value={form.bedrooms} onChange={v => update("bedrooms", v)} type="number" />
            <Field label="Bathrooms" value={form.bathrooms} onChange={v => update("bathrooms", v)} type="number" />
            <Field label="Parking" value={form.parking} onChange={v => update("parking", v)} type="number" />
            <Field label="Floor Size (m²)" value={form.floor_size} onChange={v => update("floor_size", v)} type="number" />
            <Field label="Erf Size (m²)" value={form.erf_size} onChange={v => update("erf_size", v)} type="number" />
          </div>
          <Field label="Location" value={form.location} onChange={v => update("location", v)} required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
            <textarea value={form.features} onChange={e => update("features", e.target.value)} rows={3} placeholder="Swimming pool\nGarden\nGarage" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-medium text-sm hover:bg-brand-700 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Property"}
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
    </div>
  );
}
