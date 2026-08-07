import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

async function getProperties() {
  const res = await fetch(`${URL}/rest/v1/ieprop_properties?select=id,title,price,location,type,status,slug&order=created_at.desc&limit=50`, { headers });
  return res.json();
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-sm">i</Link>
            <h1 className="font-semibold text-gray-900">Properties</h1>
          </div>
          <Link href="/admin/properties/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
            <Plus className="w-4 h-4" /> Add Property
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                  <td className="px-4 py-3 text-gray-600">{p.location}</td>
                  <td className="px-4 py-3 text-gray-900">
                    {p.type === "rent" ? "R" : "R "}{Number(p.price).toLocaleString()}{p.type === "rent" ? "/mo" : ""}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.type === "sale" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                    }`}>
                      {p.type === "sale" ? "For Sale" : "To Rent"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "sold" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                    }`}>
                      {p.status === "sold" ? "Sold" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/properties/${p.slug}`} target="_blank" className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600" title="View">
                        <Eye className="w-4 h-4" />
                      </a>
                      <Link href={`/admin/properties/${p.id}/edit`} className="p-2 rounded hover:bg-gray-100 text-gray-400 hover:text-brand-600" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 rounded hover:bg-red-50 text-gray-400 hover:text-red-600" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
