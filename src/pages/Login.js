import React from 'react';
import apiConfig from "../config/api.config"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      token: null,
      data: ""
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChangeEmail(event)   {    this.setState({email: event.target.value});  }
  handleChangePass(event)    {    this.setState({pass: event.target.value});   }

  handleSubmit(event) {

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: this.state.email,
            password: this.state.pass,
        })}

        fetch(apiConfig.url + "/v0/user/login", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.setState({token: data.token})
            console.log(this.state.token)
          })
          .catch(error => (document.getElementById("err").innerHTML = "test"))
    } 


    render() {   
        return(
          <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <input type="text" name="email" placeholder="put your email here" value={this.state.email} onChange={this.handleChangeEmail} required/>
              </label>
              <label>
                Password:
                <input type="text" value={this.state.pass} onChange={this.handleChangePass} required/>
              </label>
                <input type="submit" value="Submit" />
              <div id="err"></div>
          </form>
        )
    }
}


export default Login 