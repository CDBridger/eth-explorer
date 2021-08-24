import React, { useEffect, useState } from 'react';
import './App.css';
import { ConversionTable, GasTable, getConversion, getGas } from './api-request';
import { ConversionComponent } from './ConversionComponent';

const App: React.FC = () => {

  const [gasState, setGasState] = useState<GasTable | null>(null);
  const [conversionState, setConversionState] = useState<ConversionTable | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const retrieveData = async () => {
    console.log('Retrieving data')
    await Promise.all([getGas().then(setGasState), getConversion().then(setConversionState).catch(() => {
      console.log('Failed to retrieve data, setting bogus values')
      setConversionState({
        data: {
          symbol: 'ETH',
          name: 'Ethereum',
          last_updated: 'na',
          amount: 1,
          quote: {
            'USD': {
              price: 0,
              last_updated: 'na'
            }
          }
        },
        status: {
          error_code: '500'
        }
      })
    })]);
    setLoading(false);
  }

  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <p>Loading...</p> : <><ConversionComponent amount={gasState?.safeLow} amountWait={gasState?.safeLowWait} conversion={conversionState?.data.quote['USD'].price} />
          <ConversionComponent amount={gasState?.average} amountWait={gasState?.avgWait} conversion={conversionState?.data.quote['USD']?.price} />
          <ConversionComponent amount={gasState?.fast} amountWait={gasState?.fastWait} conversion={conversionState?.data.quote['USD']?.price} />
          <ConversionComponent amount={gasState?.fastest} amountWait={gasState?.fastest} conversion={conversionState?.data.quote['USD']?.price} />
          <button onClick={retrieveData}>Refresh</button></>}
      </header>
    </div>
  );
}

export default App;
