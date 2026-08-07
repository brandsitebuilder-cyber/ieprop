"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, Save } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  image_url: string;
  bio: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/properties/agents");
    if (res.ok) setAgents(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (agent: Partial<Agent>) => {
    const method = agent.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/agents", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agent),
    });
    if (res.ok) { load(); setEditing(null); setAdding(false); }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this agent?")) return;
    await fetch(`/api/admin/agents?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-sm">i</Link>
            <h1 className="font-semibold text-gray-900">Agents</h1>
          </div>
          <button onClick={() => setAdding(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        {(editing || adding) && (
          <AgentForm
            agent={editing || { name: "", title: "", phone: "", email: "", image_url: "", bio: "" }}
            onSave={save}
            onCancel={() => { setEditing(null); setAdding(false); }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={a.image_url || "/assets/avatar-placeholder.png"} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{a.name}</h3>
                  <p className="text-xs text-gray-500">{a.title}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">{a.email}</p>
              <p className="text-xs text-gray-500 mb-3">{a.phone}</p>
              <div className="flex gap-1">
                <button onClick={() => setEditing(a)} className="flex-1 py-1.5 text-xs rounded border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => remove(a.id)} className="flex-1 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function AgentForm({ agent, onSave, onCancel }: { agent: Partial<Agent>; onSave: (a: Partial<Agent>) => void; onCancel: () => void }) {
  const [form, setForm] = useState(agent);

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5 mb-6">
      <h3 className="font-medium text-gray-900 mb-4">{agent.id ? "Edit Agent" : "New Agent"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {["name", "title", "phone", "email", "image_url"].map((key) => (
          <input key={key} placeholder={key.replace("_", " ")} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
        ))}
      </div>
      <textarea placeholder="Bio" value={form.bio || ""} onChange={e => setForm({ ...form, bio: e.target.value })} rows={2}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 mb-4" />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 flex items-center gap-1">
          <Save className="w-3 h-3" /> Save
        </button>
        <button onClick={onCancel} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  );
}
