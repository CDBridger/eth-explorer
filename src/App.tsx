import React, { useEffect, useState } from 'react';
import './App.css';
import { GasTable, GeckoConversionTable, getConversion, getGas } from './api-request';
import { ConversionComponent } from './ConversionComponent';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Eth Explorer</title>
        <meta name="description" content="Eth Explorer App" />
      </Helmet>
      <header className="App-header">
        {loading ? <p>Loading...</p> :
          <>
            <ConversionComponent amount={gasState?.average} amountWait={gasState?.avgWait} conversion={conversionState!.ethereum.usd} lookupTable={gasState!.gasPriceRange} />
          </>}
      </header>
    </div>
  );
}

export default App;
