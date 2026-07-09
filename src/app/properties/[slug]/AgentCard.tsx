"use client";

import { Phone, MessageCircle } from "lucide-react";
import type { Agent } from "@/lib/supabase";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const trackClick = (type: "call" | "whatsapp") => {
    // Simple click tracking — can expand later
    if (typeof window !== "undefined") {
      console.log(`Agent contact: ${type}`, { agentId: agent.id, agentName: agent.name });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden shrink-0">
          {agent.photo_url ? (
            <img
              src={agent.photo_url}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold text-brand-600">
              {agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{agent.name}</p>
          {agent.position && (
            <p className="text-sm text-gray-500">{agent.position}</p>
          )}
        </div>
      </div>

      {agent.bio && (
        <p className="text-sm text-gray-600 mb-4 border-t border-gray-100 pt-3">
          {agent.bio}
        </p>
      )}

      <div className="space-y-2">
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            onClick={() => trackClick("call")}
            className="flex items-center gap-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-600" />
            {agent.phone}
          </a>
        )}

        {agent.whatsapp && (
          <a
            href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("whatsapp")}
            className="flex items-center gap-2 w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
