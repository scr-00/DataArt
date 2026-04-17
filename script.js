const timeline = document.getElementById("timeline");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

// FETCH DATA
fetch("data/events.json")
  .then(res => res.json())
  .then(data => renderEvents(data));

// RENDER EVENTS
function renderEvents(events) {
  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerText = `${event.year} - ${event.title}`;

    div.addEventListener("click", () => {
      openModal(event);
    });

    timeline.appendChild(div);
  });
}

// OPEN MODAL
function openModal(event) {
  modal.classList.remove("hidden");
  modalBody.innerHTML = `
    <h2>${event.title}</h2>
    <p>${event.description}</p>
    <small>${event.year}</small>
  `;
}

// CLOSE MODAL
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
