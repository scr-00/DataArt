export default function EventMarker({ event }: any) {
  return (
    <div className="event">
      {event.year} - {event.title}
    </div>
  );
}
