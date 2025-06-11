import { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(null);

  return (
    <div className="text-center p-6 min-h-screen bg-gradient-to-br from-cyan-100 to-cyan-300">
      <h1 className="text-4xl font-bold text-teal-800 mb-6">🚀 Tambola 2.0 - New UI</h1>
      <button
        className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-700 transition"
        onClick={() => setNumber(Math.ceil(Math.random() * 90))}
      >
        Call Number
      </button>
      {number && <div className="text-6xl mt-6 font-bold text-cyan-900">{number}</div>}
    </div>
  );
}

export default App;
