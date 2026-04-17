import { fetchEvents } from "./fetcher";
import { renderEvents } from "./renderer";

async function init() {
  const events = await fetchEvents();
  renderEvents(events);
}

init();
