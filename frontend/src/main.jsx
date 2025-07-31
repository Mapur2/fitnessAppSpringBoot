import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import CreateActivity from './components/CreateActivity.jsx'
import LandingPage from './components/LandingPage.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-activity" element={<CreateActivity />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} >
      <App />
    </RouterProvider>
    
  </StrictMode>,
)
