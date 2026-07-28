"use client";

import { useEffect } from "react";

const TRACK_URL = "https://quotehub-theta.vercel.app/api/track";
const CLIENT_SLUG = "ieprop";

export default function ClickTracking() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href") || "";
      let actionType: string | null = null;
      if (href.startsWith("tel:")) actionType = "call";
      else if (href.includes("wa.me") || href.includes("whatsapp.com"))
        actionType = "whatsapp";
      if (!actionType) return;
      navigator.sendBeacon(
        TRACK_URL,
        JSON.stringify({
          client_slug: CLIENT_SLUG,
          action_type: actionType,
          source_url: window.location.href,
        })
      );
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
