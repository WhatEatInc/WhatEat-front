import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReactDOM from 'react-dom/client'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Today from './pages/Today'

import './css/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<h1>Root</h1>} />
        <Route path="/today" element={<Today />} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
)