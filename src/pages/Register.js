import React from 'react'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import apiConfig from "../config/api.config"
import Logo from "../images/logo-gradient.png"
import Button from '../components/button/Button'

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      pass: "",
      confirm: "",
      errorMessage: ""
    }

    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.handleChangeFName = this.handleChangeFName.bind(this)
    this.handleChangeLName = this.handleChangeLName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePass = this.handleChangePass.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateEmail(email) {
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase())
  }

  validatePassword(password) {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,55}$/;
    if (password.match(decimal)) {
      return true
    }
    else {
      this.setState({ errorMessage: "The password didn't reach the standard!" })
      return false
    }
  }


  handleChangeFName(event) { this.setState({ fName: event.target.value }) }
  handleChangeLName(event) { this.setState({ lName: event.target.value }) }
  handleChangeEmail(event) { this.setState({ email: event.target.value }) }
  handleChangePass(event) { this.setState({ pass: event.target.value }) }
  handleChangeConfirm(event) { this.setState({ confirm: event.target.value }) }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.validateEmail(this.state.email)) {
      this.setState({ errorMessage: "The email is not valid!" })
      return false
    }

    if (!this.validatePassword(this.state.pass)) {
      return false
    }

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: this.state.fName,
        lastname: this.state.lName,
        email: this.state.email,
        password: this.state.pass,
      })
    }

    if (this.state.pass === this.state.confirm) {
      fetch(apiConfig.url + "/v0/user/register", requestOptions)
        .then(response => {
          if (response.ok) {
            return true
          } else {
            throw new Error('Something went wrong ...')
          }
        })
        .then(status => {
          this.props.handleRegister(true)
        })
        .catch(error => (this.setState({ errorMessage: error.message })))
    }
    else {
      this.setState({ errorMessage: "The passwords didn't match!" })
    }
  }


  render() {
    return (
      this.props.hasRegistered ?
        <Navigate to="/login" /> :
        <main className="main-site">
          <section className="login">
            <img src={Logo} alt="logo" className="login-logo" />
            <div className='recipe-card login-card'>
              <form className='login-form' onSubmit={this.handleSubmit}>
                <div className="login-form-group">
                  <label className='label'>First name</label>
                  <input className='login-input' type="text" name="fName" value={this.state.fName} onChange={this.handleChangeFName} required />
                </div>

                <div className="login-form-group">
                  <label className='label'>Last Name</label>
                  <input className="login-input" type="text" name="lName" value={this.state.lName} onChange={this.handleChangeLName} required />
                </div>

                <div className="login-form-group">
                  <label className='label'>Email</label>
                  <input className='login-input' type="email" name="email" value={this.state.email} onChange={this.handleChangeEmail} required />
                </div>

                <div className="login-form-group">
                  <label className='label'>Password</label>
                  <input className='login-input' type="password" value={this.state.pass} onChange={this.handleChangePass} required />
                </div>

                <div className="login-form-group">
                  <label className='label'>Confirm Password</label>
                  <input className='login-input' type="password" value={this.state.confirm} onChange={this.handleChangeConfirm} required />
                </div>

                <Button type="primary" className="btn-full btn-big">
                  <FontAwesomeIcon icon={faPaperPlane} /> Register
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

export default Register 