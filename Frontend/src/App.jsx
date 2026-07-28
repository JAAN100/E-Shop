import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, LoginPage, SignUp } from './Routes.js'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='log-in' element={<LoginPage />}></Route>
      <Route path='sign-up' element={<SignUp />}></Route>
    </Routes>
  )
}

export default App
