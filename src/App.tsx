import React, { useEffect, useState } from 'react';
import './App.css';
import { GasTable, GeckoConversionTable, getConversion, getGas } from './api-request';
import { ConversionComponent } from './ConversionComponent';

const App: React.FC = () => {

  const [gasState, setGasState] = useState<GasTable | null>(null);
  const [conversionState, setConversionState] = useState<GeckoConversionTable | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const retrieveData = async () => {
    console.log('Retrieving data')
    await Promise.all([getGas().then(setGasState), getConversion().then(setConversionState)]);
    setLoading(false);
  }

  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <p>Loading...</p> :
          <>
            <ConversionComponent amount={gasState?.average} amountWait={gasState?.avgWait} conversion={conversionState!.ethereum.usd} lookupTable={gasState!.gasPriceRange} />
            <button onClick={retrieveData}>Refresh</button>
          </>}
      </header>
    </div>
  );
}

export default App;
