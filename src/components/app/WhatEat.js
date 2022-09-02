import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie'

import Login from "../../pages/Login"
import Register from "../../pages/Register"
import App from "./App"
import Header from '../header/Header'
import Footer from '../footer/Footer'

class WhatEat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            hasRegistered: false,
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
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

    handleRegister(success) {
        if (success) {
            this.setState({
                hasRegistered: true,
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
                        path="/register"
                        element={
                            <Register
                                hasRegistered={this.state.hasRegistered}
                                handleRegister={this.handleRegister}
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