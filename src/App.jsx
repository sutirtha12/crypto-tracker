import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import Home from './pages/Home'
import List from './pages/List'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { fetchCoinList } from './utils/coinlist'
import CoinDetail from './components/CoinDetail'

const App = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchCoinList())
},[])
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      
      <Route path='/coinlist' element={<List/>}/>
       <Route path="/coin/:coinId" element={<CoinDetail />} />
      
      </Routes>
    </div>
  )
}

export default App
