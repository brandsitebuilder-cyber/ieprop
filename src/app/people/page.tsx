import { Phone, Mail } from "lucide-react";

const PEOPLE = [
  {
    name: "Frans Nortje",
    title: "Founder & CEO",
    photo: "/people/frans-nortje.jpg",
  },
  {
    name: "Meyer Maré",
    title: "Principal Property Practitioner",
    photo: "/people/meyer-mare.jpg",
  },
  {
    name: "Theo Maré",
    title: "Executive: Growth",
    photo: "/people/theo-mare.jpg",
  },
  {
    name: "Oelof Stander",
    title: "Full Status Property Practitioner",
    photo: "/people/oelof-stander.jpg",
  },
  {
    name: "Sophia Nortje",
    title: "Candidate Property Practitioner",
    photo: "/people/sophia-nortje.jpg",
  },
  {
    name: "Claudia Kok",
    title: "Candidate Property Practitioner",
    photo: null,
  },
  {
    name: "Sherilise Liebenberg",
    title: "Candidate Property Practitioner",
    photo: "/people/sherilise-liebenberg.jpg",
  },
  {
    name: "Ruan du Toit",
    title: "Candidate Property Practitioner",
    photo: "/people/ruan-du-toit.jpg",
  },
];

function AgentInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand text-white text-2xl font-bold">
      {initials}
    </div>
  );
}

export default function PeoplePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-brand text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Our People</h1>
          <p className="mt-4 text-brand-100 text-lg max-w-2xl mx-auto">
            Meet the team behind ieProp — dedicated property professionals committed to finding your perfect home.
          </p>
        </div>
      </section>

      {/* People Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PEOPLE.map((person) => (
            <div
              key={person.name}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all text-center"
            >
              <div className="flex justify-center mb-4">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <AgentInitials name={person.name} />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm text-brand mt-1">{person.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
