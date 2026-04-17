import { Event } from "./types";

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch("data/events.json");
  return res.json();
}
