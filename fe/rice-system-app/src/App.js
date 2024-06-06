import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Menu from './components/Menu/Menu';
import StoreProvider from './context/StoreContext';
import ContactUs from './components/ContactUs/ContactUs';
import AppDownload from './components/AppDownload/AppDownload';
import PaymentMethod from './pages/PaymentMethod/PaymentMethod';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseCart = () => {
    console.log("Cart closed");
  };

  return (
    <StoreProvider>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <BrowserRouter basename='/'>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart onClose={handleCloseCart} />} />
            <Route path='/checkout' element={<PlaceOrder />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/app' element={<AppDownload />} />
            <Route path='/contact-us' element={<ContactUs />}/>
            <Route path='/verify' element={<Verify/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
      <Footer />
    </StoreProvider>
  );
};

export default App;
