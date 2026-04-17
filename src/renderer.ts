import { Event } from "./types";

export function renderEvents(events: Event[]) {
  const timeline = document.getElementById("timeline");

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerText = `${event.year} - ${event.title}`;
    timeline?.appendChild(div);
  });
}
