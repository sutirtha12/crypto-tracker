import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CoinList from '../components/CoinList'; 

const Home = () => {
  const { coins, loading, error } = useSelector(state => state.coins);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    if (coins) {
      setFilteredCoins(
        coins.filter(
          coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, coins]);

  return (
    <div className="p-8 bg-gradient-to-b from-black to-blue-900 min-h-screen text-white">
      <header className="mb-10 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/825/825504.png"
          alt="Crypto"
          className="mx-auto w-24 h-24 mb-4 animate-pulse"
        />
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent select-none">
          Futuristic Crypto Tracker
        </h1>
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 w-full max-w-md mx-auto p-3 rounded-md bg-black bg-opacity-50 border border-cyan-600 placeholder-cyan-500 text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </header>

      {loading && <p className="text-center">Loading coins...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && <CoinList coins={filteredCoins} />}
    </div>
  );
};

export default Home;
