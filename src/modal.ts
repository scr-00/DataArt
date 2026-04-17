import { Event } from "./types";

export function openModal(event: Event) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  if (modal && body) {
    modal.classList.remove("hidden");
    body.innerHTML = `
      <h2>${event.title}</h2>
      <p>${event.description}</p>
    `;
  }
}
