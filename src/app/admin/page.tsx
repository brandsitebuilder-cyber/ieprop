import { cookies } from "next/headers";
import Link from "next/link";
import { Home, Users, MessageSquare, BarChart3, Plus, LogOut } from "lucide-react";

async function getStats() {
  const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

  const [props, agents, test] = await Promise.all([
    fetch(`${URL}/rest/v1/ieprop_properties?select=count&status=eq.active`, { headers }).then(r => r.json()),
    fetch(`${URL}/rest/v1/ieprop_agents?select=count`, { headers }).then(r => r.json()),
    fetch(`${URL}/rest/v1/ieprop_testimonials?select=count`, { headers }).then(r => r.json()),
  ]);

  return {
    activeProperties: props[0]?.count || 0,
    soldProperties: 0,
    agents: agents[0]?.count || 0,
    testimonials: test[0]?.count || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
              i
            </div>
            <h1 className="font-semibold text-gray-900">ieProp Admin</h1>
          </div>
          <a href="/api/admin/logout" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Logout
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-65px)] p-4 shrink-0 hidden md:block">
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-medium text-sm">
              <BarChart3 className="w-4 h-4" /> Dashboard
            </Link>
            <Link href="/admin/properties" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              <Home className="w-4 h-4" /> Properties
            </Link>
            <Link href="/admin/agents" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              <Users className="w-4 h-4" /> Agents
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
              <MessageSquare className="w-4 h-4" /> Testimonials
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Active Properties" value={stats.activeProperties} color="bg-blue-50 text-blue-700" />
            <StatCard label="Sold Properties" value="3" color="bg-green-50 text-green-700" />
            <StatCard label="Agents" value={stats.agents} color="bg-purple-50 text-purple-700" />
            <StatCard label="Testimonials" value={stats.testimonials} color="bg-amber-50 text-amber-700" />
          </div>

          {/* Quick actions */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction href="/admin/properties/new" icon={<Plus />} label="Add Property" desc="Create a new property listing" />
            <QuickAction href="/admin/agents/new" icon={<Plus />} label="Add Agent" desc="Add a new team member" />
            <QuickAction href="/admin/testimonials/new" icon={<Plus />} label="Add Testimonial" desc="Record a client review" />
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function QuickAction({ href, icon, label, desc }: { href: string; icon: React.ReactNode; label: string; desc: string }) {
  return (
    <Link href={href} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all group">
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-3 group-hover:bg-brand-100">
        {icon}
      </div>
      <h4 className="font-medium text-gray-900 mb-1">{label}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  );
}
