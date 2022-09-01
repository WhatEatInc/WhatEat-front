import React from 'react';
import apiConfig from "../config/api.config"
import Cookies from 'js-cookie'

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPass: "",
      pass: "",
      confirm: ""
    };
    this.handleChangeOldPass = this.handleChangeOldPass.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validatePassword(password){
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,55}$/;
    if(password.match(decimal)) 
    {
      return true;
    }
    else
    { 
      this.setState({errorMessage: "The password didn't reach the standard!"})
      return false;
    }
  } 


  handleChangeOldPass(event)   {    this.setState({oldPass: event.target.value});  }
  handleChangePass(event)    {    this.setState({pass: event.target.value});   }
  handleChangeConfirm(event) {    this.setState({confirm: event.target.value});}

  handleSubmit(event) {
    event.preventDefault();

    if(!this.validatePassword(this.state.pass)){
      return false;
    }

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + Cookies.get('token')},
      body: JSON.stringify({ 
        currentPWD: this.state.oldPass,
        newPWD: this.state.pass,
    })}

    if(this.state.pass === this.state.confirm){
      fetch(apiConfig.url + "/v0/user/changePassword", requestOptions)
      .then(response => {
        if(response.ok){
          window.open("/settings")
        }
        else{
          this.setState({errorMessage: response.statusText})
        }
      })
      .catch(error => (this.setState({errorMessage: error.message})));
    }
    else{
      this.setState({errorMessage: "The passwords didn't match!"})
    }
    
    
  } 


  render() {   
      return(
        <form onSubmit={this.handleSubmit}>
            <label>
              Actual Password:
              <input type="password" value={this.state.oldPass} onChange={this.handleChangeOldPass} required/>
            </label>
            <label>
              New Password:
              <input type="password" value={this.state.pass} onChange={this.handleChangePass} required/>
            </label>
            <label>
              Confirm Password:
              <input type="password" value={this.state.confirm} onChange={this.handleChangeConfirm} required/>
            </label>
              <input type="submit" value="Submit" />
              { this.state.errorMessage &&
                <p className="error" > { this.state.errorMessage } </p> }
        </form>
      )
  }
} 

export default ChangePassword