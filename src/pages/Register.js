import React from 'react';
import apiConfig from "../config/api.config"



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
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleChangeFName = this.handleChangeFName.bind(this);
    this.handleChangeLName = this.handleChangeLName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email) {
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
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


  handleChangeFName(event)   {    this.setState({fName: event.target.value});  }
  handleChangeLName(event)   {    this.setState({lName: event.target.value});  }
  handleChangeEmail(event)   {    this.setState({email: event.target.value});  }
  handleChangePass(event)    {    this.setState({pass: event.target.value});   }
  handleChangeConfirm(event) {    this.setState({confirm: event.target.value});}

  handleSubmit(event) {
    event.preventDefault();

      if(!this.validateEmail(this.state.email)){
        this.setState({errorMessage: "The email is not valid!"})
        return false;
      }

      if(!this.validatePassword(this.state.pass)){
        return false;
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

    if(this.state.pass === this.state.confirm){
      fetch(apiConfig.url + "/v0/user/register", requestOptions)
      .then(response =>  {
            if(response.ok){
              window.open("/login")
            }
            this.setState({errorMessage: response.statusText})
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
                First Name:
                <input type="text" name="fName" placeholder="put your first name here" value={this.state.fName} onChange={this.handleChangeFName} required/>
              </label>
              <label>
                Last Name:
                <input type="text" name="lName" placeholder="put your last name here" value={this.state.lName} onChange={this.handleChangeLName} required/>
              </label>
              <label>
                Email:
                <input type="email" name="email" placeholder="put your email here" value={this.state.email} onChange={this.handleChangeEmail} required/>
              </label>
              <label>
                Password:
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
          
)}
}

export default Register 