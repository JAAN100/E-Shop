import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage, LoginPage, SignUpPage, Activation, ProductsPage } from './Routes.js'
import { ToastContainer, Bounce } from 'react-toastify';
import store from './redux/store.js';
import ScrollToTop from './components/ScrollToTop.jsx'
function App() {
  useEffect(() => {
    store.dispatch({ type: 'user/getUser' });
  }, [])
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='log-in' element={<LoginPage />}></Route>
        <Route path='sign-up' element={<SignUpPage />}></Route>
        <Route path='products' element={<ProductsPage />}></Route>
        <Route path='activation/:activation_token' element={<Activation />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
