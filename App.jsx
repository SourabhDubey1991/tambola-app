import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'; // Ensure you import styles

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
    <div className="container">
      <h1>Tambola Caller</h1>
      <button className="call-button" onClick={handleCall}>Call Number</button>
      {currentNumber && (
        <div className="current-number">{currentNumber}</div>
      )}
      <div className="number-grid">
        {[...Array(90).keys()].map(n => (
          <div
            key={n + 1}
            className={`number-cell ${calledNumbers.includes(n + 1) ? 'called' : ''}`}
          >
            {n + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
