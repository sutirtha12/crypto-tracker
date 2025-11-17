import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoinList = ({ coins }) => {
  const navigate = useNavigate();

  const handleCoinClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="coin-list p-4 bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white rounded-lg shadow-lg mx-auto max-w-4xl">
      <h2 className="text-3xl mb-6 font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text cursor-default">
        Top Coins
      </h2>
      <ul>
        {coins.slice(0, 10).map((coin) => (
          <li
            key={coin.id}
            onClick={() => handleCoinClick(coin.id)}
            className="cursor-pointer flex items-center justify-between hover:bg-cyan-800 rounded-md p-3 mb-2 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <span className="text-lg font-semibold">
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </div>
            <span className="text-cyan-300 font-mono">${coin.current_price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
