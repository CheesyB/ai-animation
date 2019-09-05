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
        threshold={80}
        speed={0.4}
        lineColor="red"
        particleColor="gray"/>
    </div>
  );
}

export default App;
