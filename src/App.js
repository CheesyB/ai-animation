import React from 'react';
import AiAnimation from './AiAnimation'
import './App.css';

function App() {
  return (
    <div className="App">
      <AiAnimation
        width={window.innerWidth}
        height={window.innerHeight}
        particleSize={1}
        maxParticles={300}
        threshold={70}
        speed={0.4}
        lineColor="green"
        particleColor="white"/>
    </div>
  );
}

export default App;
