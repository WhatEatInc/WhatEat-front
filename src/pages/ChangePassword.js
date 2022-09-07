import React from 'react'
import { Navigate } from 'react-router-dom'
import apiConfig from "../config/api.config"
import Cookies from 'js-cookie'
import Button from "../components/button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      pass: "",
      confirm: "",
      hasChanged: false,
    };

    this.handleChangeOldPass = this.handleChangeOldPass.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validatePassword(password) {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,55}$/;
    if (password.match(decimal)) {
      return true;
    }
    else {
      this.setState({ errorMessage: "The password didn't reach the standard!" })
      return false;
    }
  }


  handleChangeOldPass(event) { this.setState({ oldPass: event.target.value }); }
  handleChangePass(event) { this.setState({ pass: event.target.value }); }
  handleChangeConfirm(event) { this.setState({ confirm: event.target.value }); }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.validatePassword(this.state.pass)) {
      return false;
    }

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
      },
      body: JSON.stringify({
        currentPWD: this.state.oldPass,
        newPWD: this.state.pass,
      })
    }

    if (this.state.pass === this.state.confirm) {
      fetch(apiConfig.url + "/v0/user/changePassword", requestOptions)
        .then(response => {
          if (response.ok) {
            this.setState({ hasChanged: true })
          }
          else {
            this.setState({ errorMessage: response.statusText })
          }
        })
        .catch(error => (this.setState({ errorMessage: error.message })));
    }
    else {
      this.setState({ errorMessage: "The passwords didn't match!" })
    }


  }


  render() {
    return (
        this.state.hasChanged ?
        <Navigate to="/app/settings" /> :
      <>
        <h1 className="page-title">Change Password</h1>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className="login-form-group">
            <label className='label'>Actual Password</label>
            <input className="login-input" type="password" value={this.state.oldPass} onChange={this.handleChangeOldPass} required />
          </div>

          <div className="login-form-group">
            <label className='label'>New Password</label>
            <input className='login-input' type="password" value={this.state.pass} onChange={this.handleChangePass} required />
          </div>

          <div className="login-form-group">
            <label className='label'>Confirm Password</label>
            <input className='login-input' type="password" value={this.state.confirm} onChange={this.handleChangeConfirm} required />
          </div>

          <Button type="primary" className="btn-full btn-big">
            <FontAwesomeIcon icon={faLock} /> Change Password
          </Button>

          {this.state.errorMessage &&
            <p className="error" > {this.state.errorMessage} </p>}
        </form>
      </>
    )
  }
}

export default ChangePassword