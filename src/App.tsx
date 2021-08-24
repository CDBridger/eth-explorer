import React, { useEffect, useState } from 'react';
import './App.css';
import { GasTable, getConversion, getGas } from './api-request';

const GWEI_TO_ETH = 1 / 1000000000;

const App: React.FC = () => {

  const [state, setState] = useState<GasTable | null>(null);

  const retrievePrices = () => {
    console.log('Retrieving prices')
    getGas().then(setState)
  }

  useEffect(() => {
    retrievePrices();
    getConversion();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Safe Low: {(state?.safeLow ?? 0) / 10} Gwei - {(((state?.safeLow ?? 0) / 10) * GWEI_TO_ETH).toFixed(9)} Eth <br />
          <sub>{(state?.safeLowWait ?? 0) * 60} seconds</sub>
        </p>
        <p>
          Average: {(state?.average ?? 0) / 10} Gwei - {(((state?.average ?? 0) / 10) * GWEI_TO_ETH).toFixed(9)} Eth  <br />
          <sub>{(state?.avgWait ?? 0) * 60} seconds</sub>
        </p>
        <p>
          Fast: {(state?.fast ?? 0) / 10} Gwei - {(((state?.fast ?? 0) / 10) * GWEI_TO_ETH).toFixed(9)} Eth  <br />
          <sub>{(state?.fastWait ?? 0) * 60} seconds</sub>
        </p>
        <p>
          Fastest: {(state?.fastest ?? 0) / 10} Gwei - {(((state?.fastest ?? 0) / 10) * GWEI_TO_ETH).toFixed(9)} Eth  <br />
          <sub>{(state?.fastestWait ?? 0) * 60} seconds</sub>
        </p>
        <button onClick={retrievePrices}>Refresh</button>
      </header>
    </div>
  );
}

export default App;
