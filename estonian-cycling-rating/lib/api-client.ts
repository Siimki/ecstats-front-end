// libs/api-client.ts
import type { RidersTop100 } from "@/lib/types"


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

import { RaceProfile } from "./types";

export async function fetchStats() {
    const res = await fetch("http://localhost:1337/api/stats", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
}

export async function fetchHomepageRaceStats() {
  const res = await fetch("http://localhost:1337/api/homepagestats", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
// --- RIDERS ---
export async function fetchRiderProfile(riderId: number, year?: number) {
  const url = new URL("http://localhost:1337/api/riderprofile");

  // Add query params
  url.searchParams.set("riderId", riderId.toString());
  if (year) {
    url.searchParams.set("year", year.toString());
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch rider profile");
  return res.json();
}

export async function fetchRaceProfile(raceId: number): Promise<RaceProfile> {
  const url = new URL("http://localhost:1337/api/raceprofile");
  url.searchParams.set("raceId", raceId.toString());

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch race profile");
  // Optionally: if the structure is { profile: ... }, return (await res.json()).profile;
  return await res.json();
}

export async function fetchTop100Riders() {
  const res = await fetch("http://localhost:1337/api/top100riders", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchRidersByQuery(query: string): Promise<RidersTop100[]> {
  const res = await fetch(`http://localhost:1337/api/riders?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to search riders")
  
  const data = await res.json()
  return Array.isArray(data) ? data : [] // safeguard
}
