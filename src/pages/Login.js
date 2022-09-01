import React from 'react';
import apiConfig from "../config/api.config"
import Cookies from 'js-cookie'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      errorMessage: ""
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event)   {    this.setState({email: event.target.value});  }
  handleChangePass(event)    {    this.setState({pass: event.target.value});   }

  handleSubmit(event) {
    event.preventDefault();
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: this.state.email,
        password: this.state.pass,
    })}

    fetch(apiConfig.url + "/v0/user/login", requestOptions)
      .then(response => {
        if(!response.ok){
          this.setState({errorMessage: response.statusText})
        }
        return response.json();
      })
      .then(json => {
        Cookies.set('token', json.token)
      })
      .catch(error => (this.setState({errorMessage: error.message})));
          
  } 

    render() {   
        return(
          <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <input type="email" name="email" placeholder="put your email here" value={this.state.email} onChange={this.handleChangeEmail} required/>
              </label>
              <label>
                Password:
                <input type="password" value={this.state.pass} onChange={this.handleChangePass} required/>
              </label>
                <input type="submit" value="Submit" />
                { this.state.errorMessage &&
                  <p className="error" > { this.state.errorMessage } </p> }
          </form>
        )
    }
}


export default Login 