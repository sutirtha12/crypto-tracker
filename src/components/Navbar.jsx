import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-blue-600 shadow-lg">
      <div className="text-3xl font-extrabold bg-cyan-500 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text cursor-default">
         <Link className='text-white'
            to="/">
            Crypto Tracker
          </Link>
      </div>
      <ul className="flex space-x-10 text-lg font-semibold text-blue-400">
        <li>
          <Link
            to="/coinlist"
            className="relative px-3 py-1 hover:text-cyan-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-cyan-400 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100"
          >
            CoinList
          </Link>
        </li>
        
        <li>
          <Link
            to="/login"
            className="relative px-3 py-1 hover:text-cyan-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-cyan-400 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
