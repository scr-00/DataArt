import { fetchEvents } from "./fetcher.js";
import { renderTimeline } from "./renderer.js";

async function main() {
  const events = await fetchEvents();
  renderTimeline(events);
}

main();
