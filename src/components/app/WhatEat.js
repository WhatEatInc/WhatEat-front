import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie'

import Login from "../../pages/Login"
import App from "./App"
import Header from '../header/Header'
import Footer from '../footer/Footer'

class WhatEat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
        }

        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount() {
        const token = Cookies.get("token")
        if (token !== undefined && token !== "undefined") {
            this.setState({
                isLoggedIn: true,
            })
        }
    }

    handleLogin(success) {
        if (success) {
            this.setState({
                isLoggedIn: true,
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route 
                        index 
                        element={
                            <h1>Home</h1>
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <Login 
                                handleLogin={this.handleLogin}
                                isLoggedIn={this.state.isLoggedIn}
                            />
                        } 
                    />
                    <Route 
                        path="app/*" 
                        element={
                            !this.state.isLoggedIn ? 
                            <Navigate to="/login" /> :
                            <>
                                <Header />
                                <main className='main'>
                                    <App />
                                </main>
                                <Footer />
                            </>
                        } 
                    />
                    <Route 
                        path="*" 
                        element={
                            <Navigate to="/" />
                        } 
                    />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default WhatEat