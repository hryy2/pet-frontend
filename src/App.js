import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import { useEffect } from 'react'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Store from './Pages/Store/Store'
import HelpCenter from './Pages/HelpCenter/HelpCenter'
import Cart from './Components/Cart/Cart'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import UserProfile from './Components/UserProfile/UserProfile'
import Wishlist from './Components/Wishlist/Wishlist'
import Layout from './Layouts/Layout/Layout'
import { toast } from 'react-toastify'
import Checkout from './Components/Checkout/Checkout'
import OrderSuccessfull from './Components/OrderSuccesfull/OrderSuccessfull'
import OrderDetail from './Components/OrderDetail/OrderDetail'
import PrivateLayout from './Layouts/PrivateLayout/PrivateLayout'
import NotFound from './Components/NotFound/NotFound'
import { useState } from 'react'

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const handleOnline = () => {
      toast.success('You are now back online!')
    }
    const handleOffline = () => {
      toast.error('Check Your Internet Connection')
    }
    if (!window.navigator.onLine) {
      handleOffline()
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' autoClose={1000} theme='dark' draggable />
      <Routes>
        <Route path='/' element={<Layout searchResults={searchResults} setSearchResults={setSearchResults} />}>
          <Route index element={<Homepage searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path='store' element={<Store />} />
          <Route path='productdetail/:id' element={<ProductDetail />} />
          <Route path='help' element={<HelpCenter />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route element={<PrivateLayout />}>
            <Route path='userprofile' element={<UserProfile />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-success' element={<OrderSuccessfull />} />
            <Route path='/order-detail/:id' element={<OrderDetail />} />
          </Route>
        </Route>
       {/* The login page is wrapped with AuthLayout and displayed in full screen */}
        <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
