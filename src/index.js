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
        <Route path="/" element={<h1>/</h1>} />
        <Route path="/test" element={<h1>test</h1>} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
)