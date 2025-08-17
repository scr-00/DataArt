import { EventData } from "./types.js";

export function openModal(event: EventData): void {
  const modal = document.getElementById("modal");
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <span id="modal-close">&times;</span>
      <h2>${event.year} – ${event.title}</h2>
      <img src="${event.imageURL}" alt="${event.title}" style="max-width:100%; border-radius:8px;">
      <p>${event.description}</p>
      <p><strong>Category:</strong> ${event.category}</p>
    </div>
  `;
  modal.classList.add("active");

  const closeBtn = document.getElementById("modal-close");
  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === modal) closeModal();
  });
}

export function closeModal(): void {
  const modal = document.getElementById("modal");
  modal?.classList.remove("active");
}
