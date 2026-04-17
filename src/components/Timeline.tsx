import { useEffect, useState } from "react";
import EventMarker from "./EventMarker";

export default function Timeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/data/events.json")
      .then(res => res.json())
      .then(setEvents);
  }, []);

  return (
    <div>
      {events.map((e: any, i) => (
        <EventMarker key={i} event={e} />
      ))}
    </div>
  );
}
