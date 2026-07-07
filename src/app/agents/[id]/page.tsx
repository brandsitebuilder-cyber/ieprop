import { supabase } from "@/lib/supabase";
import type { Agent, Property } from "@/lib/supabase";
import Link from "next/link";
import { Phone, Mail, MapPin, Bed, Bath, Car, Ruler, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agentId = parseInt(id, 10);

  if (isNaN(agentId)) notFound();

  const { data: agent, error } = await supabase
    .from("ieprop_agents")
    .select("*")
    .eq("id", agentId)
    .single();

  if (error || !agent) notFound();

  const { data: properties } = await supabase
    .from("ieprop_properties")
    .select("*")
    .eq("agent_id", agentId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <main className="flex-1">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/agents"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand transition-colors"
        >
          <ArrowLeft size={16} />
          Back to agents
        </Link>
      </div>

      {/* Agent Profile */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="shrink-0">
              {agent.photo_url ? (
                <img
                  src={agent.photo_url}
                  alt={agent.name}
                  className="h-40 w-40 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-brand text-white text-5xl font-bold">
                  {agent.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
              {agent.position && (
                <p className="text-brand font-medium mt-1">{agent.position}</p>
              )}
              {agent.bio && (
                <p className="mt-4 text-gray-600 leading-relaxed">{agent.bio}</p>
              )}

              {/* Contact */}
              <div className="flex flex-wrap gap-4 mt-6">
                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Phone size={16} />
                    {agent.phone}
                  </a>
                )}
                {agent.whatsapp && (
                  <a
                    href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-colors text-sm"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                )}
                {agent.email && (
                  <a
                    href={`mailto:${agent.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Mail size={16} />
                    {agent.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listed Properties */}
      {properties && properties.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Listed Properties ({properties.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: Property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug || property.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              >
                {/* Property Image Placeholder */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0].url}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                        property.type === "sale"
                          ? "bg-brand/10 text-brand"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      For {property.type === "sale" ? "Sale" : "Rent"}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(property.price)}
                      {property.type === "rent" && (
                        <span className="text-sm font-normal text-gray-500">/mo</span>
                      )}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-3">
                    <span className="flex items-center gap-1">
                      <Bed size={14} /> {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={14} /> {property.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Car size={14} /> {property.parking}
                    </span>
                    {(property.floor_size || property.erf_size) && (
                      <span className="flex items-center gap-1">
                        <Ruler size={14} /> {property.floor_size || property.erf_size}m²
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(!properties || properties.length === 0) && (
        <section className="max-w-6xl mx-auto px-4 pb-16 text-center">
          <p className="text-gray-500">No active property listings from this agent.</p>
        </section>
      )}
    </main>
  );
}
