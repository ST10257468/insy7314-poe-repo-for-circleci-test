/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29
*/
import { useState } from "react";

export default function SecurityDemo() {
  const [events, setEvents] = useState([]);
  const log = (msg) => setEvents((prev) => [...prev, msg]);
  const tryExternalFetch = async () => {
    try {
      const res = await fetch("https://api.github.com/rate_limit");
      log(`External fetch status: ${res.status}`);
    } catch (e) {
      log(`External fetch error: ${e}`);
    }
  };

  const tryEval = () => {
    try {
      const fn = new Function("return 42");
      alert(fn());
    } catch (e) {
      log(`Eval error: ${e}`);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>CSP Demo</h2>
      <img
        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
        alt="Should be blocked by CSP"
        width={300}
        height={200}
        onError={() => log("External image blocked (expected)")}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={tryExternalFetch}>Try external fetch</button>
        <button onClick={tryEval} style={{ marginLeft: 8 }}>
          Try eval()
        </button>
      </div>

      <h3 style={{ marginTop: 16 }}>Observed events (for convenience):</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>

      <p>
        Open DevTools → Console & Network for CSP blocks. Check backend logs for
        POSTs to <code>/csp-report</code>.
      </p>
    </div>
  );
}
