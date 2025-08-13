// Fetch events from JSON and render them
fetch('data/events.json')
  .then(response => response.json())
  .then(events => {
    const timeline = document.getElementById('timeline');

    events.forEach(event => {
      const article = document.createElement('article');
      article.classList.add('timeline-event');

      article.innerHTML = `
        <h2>${event.year} – ${event.title}</h2>
        <figure>
          <img src="${event.imageURL}" alt="${event.title}">
          <figcaption>${event.category}</figcaption>
        </figure>
        <p>${event.description}</p>
      `;

      article.addEventListener('click', () => openModal(event));

      timeline.appendChild(article);
    });
  })
  .catch(err => console.error('Error loading events:', err));

// Modal open function
function openModal(event) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span id="modal-close">&times;</span>
      <h2>${event.year} – ${event.title}</h2>
      <img src="${event.imageURL}" alt="${event.title}" style="max-width:100%; border-radius:8px;">
      <p>${event.description}</p>
      <p><strong>Category:</strong> ${event.category}</p>
    </div>
  `;
  modal.classList.add('active');

  document.getElementById('modal-close').addEventListener('click', closeModal);
}

// Close modal function
function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

// Close modal when clicking outside content
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    closeModal();
  }
});
