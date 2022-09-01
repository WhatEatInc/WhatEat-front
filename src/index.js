import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import App from './components/app/App'

import './css/app.css'
import "react-toggle/style.css"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Cookies from 'js-cookie'

function hasCookie() {
    return Cookies.get('token') !== undefined
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<h1>Landing</h1>} />
            <Route path="app/*" element={
                !hasCookie() ? <Navigate to="/login" /> :
                <>
                    <Header />
                    <main className='main'>
                        <App />
                    </main>
                    <Footer />
                </>
            } />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </BrowserRouter>
)
