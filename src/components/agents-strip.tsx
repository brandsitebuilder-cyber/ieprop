import Link from 'next/link';
import Image from 'next/image';
import type { Agent } from '@/lib/supabase';

export default function AgentsStrip({ agents }: { agents: Agent[] }) {
  if (!agents || agents.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Our agents</h2>
        <Link
          href="/agents"
          className="text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={`/agents/${agent.id}`}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-3 ring-2 ring-transparent group-hover:ring-brand-500 transition-all">
              {agent.photo_url ? (
                <Image
                  src={agent.photo_url}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                  {agent.name.charAt(0)}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors">
              {agent.name}
            </p>
            {agent.position && (
              <p className="text-xs text-gray-400 mt-0.5">{agent.position}</p>
            )}
          </Link>
        ))}

        {/* Fill empty slots with empty space if fewer than 4 agents */}
        {Array.from({ length: Math.max(0, 4 - agents.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="hidden sm:block" />
        ))}
      </div>
    </section>
  );
}
