import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, SignUpPage } from './Routes.js'
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
      </Routes>
    </>
  )
}

export default App
