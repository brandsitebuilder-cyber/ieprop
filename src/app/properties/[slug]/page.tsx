import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Property } from "@/lib/supabase";
import ImageGallery from "./ImageGallery";
import EnquiryForm from "./EnquiryForm";
import AgentCard from "./AgentCard";
import PropertyCalculator from "./PropertyCalculator";
import {
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  Check,
} from "lucide-react";

function formatPrice(price: number, type: string): string {
  const formatted =
    price >= 1_000_000
      ? `R${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
      : `R${price.toLocaleString("en-ZA")}`;
  return type === "rent" ? `${formatted}/mo` : formatted;
}

async function getProperty(slug: string) {
  const { data, error } = await supabase
    .from("ieprop_properties")
    .select(
      "*, images:ieprop_property_images(*), agent:ieprop_agents(*)"
    )
    .eq("slug", slug)
    .eq("status", "active")
    .single();

  if (error || !data) return null;

  const property = data as Property;
  // Sort images
  if (property.images) {
    property.images.sort((a, b) => a.sort_order - b.sort_order);
  }

  return property;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Property Not Found | ieProp" };

  return {
    title: `${property.title} | ieProp`,
    description:
      property.description?.slice(0, 160) ??
      `${property.bedrooms} bed, ${property.bathrooms} bath ${property.type === "rent" ? "rental" : "property"} in ${property.location}`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-brand-600 transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/properties" className="hover:text-brand-600 transition-colors">
          Properties
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <ImageGallery images={property.images ?? []} title={property.title} />

          {/* Price & Status */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-2 ${
                  property.type === "sale"
                    ? "bg-brand-100 text-brand-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {property.type === "sale" ? "For Sale" : "To Rent"}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">
                {property.title}
              </h1>
              <p className="mt-1 flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                {property.location}
              </p>
            </div>
            <p className="text-3xl font-bold text-brand-600">
              {formatPrice(property.price, property.type)}
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<Bed className="w-5 h-5" />} label="Bedrooms" value={property.bedrooms} />
            <StatCard icon={<Bath className="w-5 h-5" />} label="Bathrooms" value={property.bathrooms} />
            <StatCard icon={<Car className="w-5 h-5" />} label="Parking" value={property.parking} />
            {property.floor_size ? (
              <StatCard
                icon={<Maximize className="w-5 h-5" />}
                label="Floor Size"
                value={`${property.floor_size}m²`}
              />
            ) : property.erf_size ? (
              <StatCard
                icon={<Maximize className="w-5 h-5" />}
                label="Erf Size"
                value={`${property.erf_size}m²`}
              />
            ) : null}
          </div>

          {/* Description */}
          {property.description && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-line">
                {property.description}
              </div>
            </section>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Location Map */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Location</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                title={`Map of ${property.location}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=27.9%2C-26.3%2C28.3%2C-26.0&amp;layer=mapnik`}
                className="w-full h-64 border-0"
                loading="lazy"
              />
              <div className="p-3 text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.location}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Enquiry Form */}
          <EnquiryForm propertyId={property.id} propertyTitle={property.title} />

          {/* Affordability Calculator */}
          <PropertyCalculator price={property.price} type={property.type} />

          {/* Agent Card */}
          {property.agent && <AgentCard agent={property.agent} />}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 mb-2">
        {icon}
      </div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
