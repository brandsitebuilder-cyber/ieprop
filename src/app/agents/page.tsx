import { supabase } from "@/lib/supabase";
import type { Agent } from "@/lib/supabase";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

function AgentInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white text-xl font-bold">
      {initials}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default async function AgentsPage() {
  const { data: agents, error } = await supabase
    .from("ieprop_agents")
    .select("*")
    .order("name");

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Failed to load agents.</p>
      </div>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Our Agents</h1>
          <p className="mt-4 text-green-50 text-lg max-w-2xl mx-auto">
            Meet our team of experienced property professionals dedicated to finding your perfect home.
          </p>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {agents && agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent: Agent) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-brand/20 transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  {agent.photo_url ? (
                    <img
                      src={agent.photo_url}
                      alt={agent.name}
                      className="h-20 w-20 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="mb-4">
                      <AgentInitials name={agent.name} />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand transition-colors">
                    {agent.name}
                  </h3>
                  {agent.position && (
                    <p className="text-sm text-gray-500 mt-1">{agent.position}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4">
                    {agent.phone && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone size={14} />
                        {agent.phone}
                      </span>
                    )}
                    {agent.whatsapp && (
                      <span className="flex items-center gap-1.5 text-sm text-brand">
                        <WhatsAppIcon />
                        WhatsApp
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No agents listed yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
