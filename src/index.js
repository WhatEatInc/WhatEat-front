import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './css/app.css'
import "react-toggle/style.css"

import App from './components/app/App'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './pages/Login'

import Cookies from 'js-cookie'

function hasCookie() {
    return !(Cookies.get('token') === undefined || Cookies.get('token') === "undefined")
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
)
