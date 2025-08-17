import { EventData } from "./types.js";
import { openModal } from "./modal.js";

export function renderTimeline(events: EventData[]): void {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  events.forEach((event: EventData) => {
    const article = document.createElement("article");
    article.classList.add("timeline-event");

    article.innerHTML = `
      <h2>${event.year} – ${event.title}</h2>
      <figure>
        <img src="${event.imageURL}" alt="${event.title}">
        <figcaption>${event.category}</figcaption>
      </figure>
      <p>${event.description}</p>
    `;

    article.addEventListener("click", () => openModal(event));

    timeline.appendChild(article);
  });
}
