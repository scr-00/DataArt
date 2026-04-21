import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/data/events.json")
      .then(res => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="container">
      
      {/* HEADER */}
      <div className="header">
        <h1>📅 Timeline App</h1>
        <p>Explore events through time</p>
      </div>

      {/* TIMELINE */}
      <div className="timeline">
        {events.map((event, i) => (
          <div 
            key={i} 
            className="card"
            onClick={() => setSelected(event)}
          >
            <div className="year">{event.year}</div>
            <div>{event.title}</div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div 
            className="modal-box" 
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              className="close-btn" 
              onClick={() => setSelected(null)}
            >
              ❌
            </span>

            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <small>{selected.year}</small>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
