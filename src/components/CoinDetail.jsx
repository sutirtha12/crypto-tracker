import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketChart } from '../utils/marketchartslice'; // Adjust path as needed
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CoinDetail = () => {
  const { coinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (coinId) {
      dispatch(fetchMarketChart(coinId));
    }
  }, [dispatch, coinId]);

  const { chartData, loading, error } = useSelector(store => store.marketChart);
  const coins = useSelector(store => store.coins.coins);
  const coin = coins.find(c => c.id === coinId);

  if (!coin) return <p className="text-center text-red-500 mt-6">Coin not found or loading...</p>;

  const chartJSData = chartData 
    ? {
        labels: chartData.prices.map(p => new Date(p[0]).toLocaleDateString()),
        datasets: [
          {
            label: 'Price (USD)',
             data:chartData.prices.map(p => p[1]),
            fill: true,
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderColor: 'rgba(0, 255, 255, 1)',
            tension: 0.3,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-start p-6">
      <div className="max-w-4xl w-full rounded-lg bg-black bg-opacity-80 shadow-lg">
        <div className="flex items-center space-x-4 mb-5 p-4">
          <img src={coin.image} alt={coin.name} className="w-14 h-14 rounded-full" />
          <h1 className="text-3xl font-extrabold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        </div>
        <p className="text-cyan-300 text-lg mb-4 font-mono px-4">Current Price: ${coin.current_price.toLocaleString()}</p>
        <div className="px-4">
          {loading && <p>Loading chart...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {chartJSData && <Line data={chartJSData} />}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-cyan-200 p-4">
          <div><b>All Time High:</b> ${coin.ath.toLocaleString()} ({coin.ath_change_percentage.toFixed(2)}%)</div>
          <div><b>All Time Low:</b> ${coin.atl.toLocaleString()} ({coin.atl_change_percentage.toFixed(2)}%)</div>
          <div><b>Market Cap Rank:</b> #{coin.market_cap_rank}</div>
          <div><b>Circulating Supply:</b> {coin.circulating_supply.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
