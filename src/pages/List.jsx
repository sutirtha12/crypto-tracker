import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CoinList from '../components/CoinList'; 

const List = () => {
  const [isGrid, setIsGrid] = useState(true);
  const navigate = useNavigate();
  const { coins, loading, error } = useSelector(state => state.coins);

  const handleCoinClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div className='bg-black text-white'>
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setIsGrid(true)}
          className={`px-4 py-2 rounded transition ${
            isGrid ? 'bg-cyan-500 text-black' : 'bg-gray-700'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setIsGrid(false)}
          className={`px-4 py-2 rounded transition ${
            !isGrid ? 'bg-cyan-500 text-black' : 'bg-gray-700'
          }`}
        >
          List View
        </button>
      </div>

      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => handleCoinClick(coin.id)}
              className="bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center space-y-3 hover:bg-cyan-900 transition cursor-pointer"
            >
              <img src={coin.image} alt={coin.name} className="w-16 h-16 rounded-full" />
              <h3 className="text-lg font-semibold">{coin.name}</h3>
              <p className="text-cyan-400 font-mono">${coin.current_price.toLocaleString()}</p>
              <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => handleCoinClick(coin.id)}
              className="bg-gray-900 rounded-lg shadow-lg p-4 flex items-center space-x-6 hover:bg-cyan-900 transition cursor-pointer"
            >
              <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{coin.name}</h3>
                <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
              </div>
              <p className="text-cyan-400 font-mono">${coin.current_price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
