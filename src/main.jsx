import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './routes/Layout.jsx'
import App from './App.jsx'
import DetailView from './routes/DetailView.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}> 
      <Route index element={<App />} />
      <Route path="/weatherDetails/:date" element={<DetailView />} />
    </Route>
  </Routes>
</BrowserRouter>
)
