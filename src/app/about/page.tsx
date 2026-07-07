import { Building2, HeartHandshake, BadgeCheck, TrendingUp, Search } from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Trusted Expertise",
    description:
      "Our agents bring years of local market knowledge to guide you through every step of buying, selling, or renting.",
  },
  {
    icon: HeartHandshake,
    title: "Personalised Service",
    description:
      "We take the time to understand your unique needs and match you with properties and agents that fit your goals.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description:
      "With hundreds of satisfied clients and properties sold, our track record speaks for itself.",
  },
  {
    icon: Search,
    title: "Full Transparency",
    description:
      "From clear pricing to honest advice, we believe in building relationships based on trust and openness.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">About ieProp</h1>
          <p className="mt-4 text-green-50 text-lg max-w-2xl mx-auto">
            Connecting people with properties and trusted agents across South Africa.
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-brand/10">
            <Building2 size={32} className="text-brand" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your Partner in Property
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          ieProp is a South African property agency dedicated to making real estate simple,
          transparent, and accessible. Whether you&apos;re a first-time buyer, a seasoned investor,
          or looking to sell, our team of experienced agents is here to help. We combine local
          market expertise with a modern, technology-driven approach to deliver exceptional
          results for our clients.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Founded with a mission to elevate the property experience, ieProp offers comprehensive
          services including property sales, rentals, bond origination assistance, and property
          valuations. We serve clients across Gauteng and surrounding areas, with a growing
          network of agents who share our commitment to excellence.
        </p>
      </section>

      {/* Why Choose ieProp */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose ieProp?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason) => (
              <div key={reason.title} className="text-center">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-brand/10 mx-auto mb-4">
                  <reason.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to find your next property?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse our listings or get in touch with one of our expert agents today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/properties"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
          >
            View Properties
          </a>
          <a
            href="/agents"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Meet Our Agents
          </a>
        </div>
      </section>
    </main>
  );
}
