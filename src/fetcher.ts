import { EventData } from "./types.js";

export async function fetchEvents(): Promise<EventData[]> {
  try {
    const response = await fetch("data/events.json");
    if (!response.ok) throw new Error("Failed to fetch events.json");
    const data: EventData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
}
