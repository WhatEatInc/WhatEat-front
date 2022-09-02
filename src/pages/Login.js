import React from 'react'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import Cookies from 'js-cookie'

import apiConfig from "../config/api.config"
import Button from "../components/button/Button"
import Logo from "../images/logo-gradient.png"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      errorMessage: "",
      isLoggedIn: false,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) { this.setState({ email: event.target.value }); }
  handleChangePass(event) { this.setState({ pass: event.target.value }); }

  handleSubmit(event) {
    event.preventDefault();
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass,
      })
    }

    fetch(apiConfig.url + "/v0/user/login", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Invalid credentials")
        }
      })
      .then(data => {
        Cookies.set("token", data.token)
        this.setState({ isLoggedIn: true })
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message
        })
      })
  }

  render() {
    return (
      this.state.isLoggedIn ?
        <Navigate to="/app/today" /> :
        <main className='main-site'>
          <section className="login">
            <img src={Logo} alt="logo" className="login-logo" />
            <div className='recipe-card login-card'>
              <form className='login-form' onSubmit={this.handleSubmit}>
                <div className="login-form-group">

                  <label htmlFor='email' className='label'>
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </label>
                  <input className='login-input' type="email" name="email" value={this.state.email} onChange={this.handleChangeEmail} required />
                </div>

                <div className="login-form-group">
                  <label className='label'>
                    <FontAwesomeIcon icon={faKey} /> Password
                  </label>
                  <input className='login-input' type="password" value={this.state.pass} onChange={this.handleChangePass} required />
                </div>

                <Button type="primary" className="btn-full btn-big">
                  <FontAwesomeIcon icon={faPaperPlane} /> Login
                </Button>

                {this.state.errorMessage &&
                  <p className="error" > {this.state.errorMessage} </p>}
              </form>
            </div>
          </section>
        </main>
    )
  }
}


export default Login 