import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie'

import Login from "../../pages/Login"
import Register from "../../pages/Register"
import App from "./App"
import Header from '../header/Header'
import Footer from '../footer/Footer'

import apiConfig from "../../config/api.config"

class WhatEat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            hasRegistered: false,
            isAuth: false
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        //this.authGuard()
    }

    // function to guard the component for private access
    authGuard() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + Cookies.get('token')},
        }
    
        fetch(apiConfig.url + "/v0/user/test", requestOptions)
        .then(response => {
            if(response.ok){
                this.setState({
                    isAuth: true,
                })
                return true
            }
            else{
                Cookies.remove('token')
                this.setState({
                    isAuth: false,
                })
                return false
        }})
        .catch(error => (this.setState({errorMessage: error.message})));
    }


    handleLogin(success) {
        if (success) {
            this.setState({
                isLoggedIn: true,
            })
        }
    }

    handleLogout() {
        Cookies.remove("token")
        this.setState({
            isLoggedIn: false,
        })
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
                            !this.state.isAuth ?
                            <Navigate to="/login" /> :
                            <>
                                <Header />
                                <main className='main'>
                                    <App
                                        handleLogout={this.handleLogout}
                                    />
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