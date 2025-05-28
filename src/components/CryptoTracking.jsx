import React, { useEffect, useReducer } from 'react';
import { CiStar } from "react-icons/ci";

const initialState = {
  loading: true,
  error: null,
  cryptos: []
};

export const cryptoReducer=(state, action)=> {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: null,
        cryptos: action.payload
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'Failed to fetch data',
        cryptos: []
      };
    default:
      return state;
  }
}

export const CryptoTracking = () => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);
  const { loading, error, cryptos } = state;

  const api = "https://api.coinranking.com/v2/coins?referenceCurrencyUuid=yhjMzLPhuIDl";

 
    const fetchData = async () => {
      try {
        const res = await fetch(api, {
          headers: {
            'API-X-KEY': "coinrankingdbc41004f9d55cfea968def5560ac0c64c3933d18acdfcab"
          }
        });
        const data = await res.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data.coins });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR' });
        console.error(err);
      }
    };
 useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1>Crypto Price Tracking App</h1>

      {loading && <>Loading...</>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Market Cap</th>
              <th>Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((currvalue, index) => (
              <tr key={index}>
                <td><CiStar className='star' /> {currvalue.rank}</td>
                <td>
                  <div className='icon'>
                    <img src={currvalue.iconUrl} alt="Crypto icon" />
                    <div>{currvalue.name}</div>
                    <div className='symbol'>{currvalue.symbol}</div>
                  </div>
                </td>
                <td>${Number(currvalue.price).toLocaleString()}</td>
                <td className={currvalue.change < 0 ? 'off' : 'on'}>
                  {currvalue.change}
                </td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(currvalue.marketCap)}
                </td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(currvalue['24hVolume'])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default CryptoTracking;