import React,{ useState } from 'react'
import LandingPage from './components/LandingPage';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
