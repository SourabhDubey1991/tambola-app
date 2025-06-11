import { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Tambola Caller</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCall}>
        Call Number
      </button>
      {currentNumber && <div className="text-5xl mt-4">{currentNumber}</div>}
      <div className="grid grid-cols-10 gap-2 mt-6">
        {[...Array(90).keys()].map(n => (
          <div
            key={n + 1}
            className={`p-2 rounded ${calledNumbers.includes(n + 1) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {n + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
