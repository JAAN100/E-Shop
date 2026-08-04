import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, SignUpPage, Activation } from './Routes.js'
import { ToastContainer, Bounce } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='log-in' element={<LoginPage />}></Route>
        <Route path='sign-up' element={<SignUpPage />}></Route>
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
