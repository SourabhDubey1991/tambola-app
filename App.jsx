import React, { useState } from "react";

const generateTicket = () => {
  const ticket = Array.from({ length: 3 }, () =>
    Array(9).fill(null)
  );
  for (let row = 0; row < 3; row++) {
    let numbers = Array.from({ length: 9 }, (_, i) => i);
    let used = new Set();
    while (used.size < 5) {
      const col = numbers[Math.floor(Math.random() * numbers.length)];
      if (!used.has(col)) {
        used.add(col);
        ticket[row][col] = Math.floor(Math.random() * 10 + col * 10 + 1);
      }
    }
  }
  return ticket;
};

const Ticket = ({ data }) => (
  <div className="ticket">
    {data.map((row, i) => (
      <div key={i} className="row">
        {row.map((num, j) => (
          <div key={j} className="cell">
            {num || ""}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default function App() {
  const [ticket, setTicket] = useState(generateTicket());

  return (
    <div className="app">
      <h1>Tambola Ticket Generator</h1>
      <Ticket data={ticket} />
      <button onClick={() => setTicket(generateTicket())}>Generate New Ticket</button>
    </div>
  );
}
