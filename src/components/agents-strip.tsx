import Link from 'next/link';

const TEAM = [
  { name: "Frans Nortje", title: "Founder & CEO", photo: "/people/frans-nortje.jpg" },
  { name: "Meyer Maré", title: "Principal Property Practitioner", photo: "/people/meyer-mare.jpg" },
  { name: "Theo Maré", title: "Executive: Growth", photo: "/people/theo-mare.jpg" },
  { name: "Oelof Stander", title: "Full Status Property Practitioner", photo: "/people/oelof-stander.jpg" },
  { name: "Sophia Nortje", title: "Candidate Property Practitioner", photo: "/people/sophia-nortje.jpg" },
  { name: "Claudia Kok", title: "Candidate Property Practitioner", photo: "/people/claudia-kok.jpg" },
  { name: "Sherilise Liebenberg", title: "Candidate Property Practitioner", photo: "/people/sherilise-liebenberg.jpg" },
  { name: "Ruan du Toit", title: "Candidate Property Practitioner", photo: "/people/ruan-du-toit.jpg" },
];

export default function AgentsStrip() {
  const display = TEAM.slice(0, 4);

  return (
    <section className="mt-12 py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
        <Link
          href="/people"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {display.map((person) => (
          <Link
            key={person.name}
            href="/people"
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-3 ring-2 ring-transparent group-hover:ring-brand-500 transition-all">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                  {person.name.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors">
              {person.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{person.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
