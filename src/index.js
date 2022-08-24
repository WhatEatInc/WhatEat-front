import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReactDOM from 'react-dom/client'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import './css/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<h1>Root</h1>} />
        <Route path="/today" element={<h1>Today</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
)