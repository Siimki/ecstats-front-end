// libs/api-client.ts

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