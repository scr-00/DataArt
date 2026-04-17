export default function EventModal({ event, onClose }: any) {
  if (!event) return null;

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
    </div>
  );
}
