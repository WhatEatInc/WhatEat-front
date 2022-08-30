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
      postId: null
    };
    this.handleChangeFName = this.handleChangeFName.bind(this);
    this.handleChangeLName = this.handleChangeLName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFName(event) {    this.setState({fName: event.target.value});  }
  handleChangeLName(event) {    this.setState({lName: event.target.value});  }
  handleChangeEmail(event) {    this.setState({email: event.target.value});  }
  handleChangePass(event) {     this.setState({pass: event.target.value});  }
  handleChangeConfirm(event) {    this.setState({confirm: event.target.value});  }

  handleSubmit(event) {
      if(!validateEmail(this.state.email)){
        console.log("error!")
        return false;
      }

      if(!validatePassword(this.state.pass)){
        console.log("error!")
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
      console.log('A name was submitted: ' + this.state.email + "/" +this.state.fName + "/" + this.state.lName);
      console.log(requestOptions);
      fetch(apiConfig.url + "/v0/user/register", requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
      event.preventDefault();
    }
    else{
      console.log("The passwords didn't match!!");
      event.preventDefault();
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
    <input type="text" name="email" placeholder="put your email here" value={this.state.email} onChange={this.handleChangeEmail} required/>
    </label>
    <label>
        Password:
  <input type="text" value={this.state.pass} onChange={this.handleChangePass} required/>
  </label>
  <label>
        Confirm Password:
  <input type="text" value={this.state.confirm} onChange={this.handleChangeConfirm} required/>
  </label>
    <input type="submit" value="Submit" />
</form>
)}
}


function validateEmail(email) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

function validatePassword(password){
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,55}$/;
  if(password.match(decimal)) 
  {
    return true;
    }
    else
    { 
    alert('Wrong...!')
    return false;
    }
    } 

export default Register 