
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('https://your-server-url.onrender.com');

function App() {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);

  useEffect(() => {
    socket.on('init', (data) => {
      setCalledNumbers(data.calledNumbers);
    });

    socket.on('number-called', (number) => {
      setCurrentNumber(number);
      setCalledNumbers(prev => [...prev, number]);
    });

    return () => socket.disconnect();
  }, []);

  const handleCall = () => {
    socket.emit('call-number');
  };

  return (
    <div className="app-container">
      <h1>🎲 Tambola Number Caller</h1>

      <button className="call-btn" onClick={handleCall}>Call Number</button>

      {currentNumber && (
        <div className="current-number animate-ping">{currentNumber}</div>
      )}

      <div className="grid-container">
        {[...Array(90).keys()].map(n => (
          <div
            key={n + 1}
            className={`number-box ${calledNumbers.includes(n + 1) ? 'called' : ''}`}
          >
            {n + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
