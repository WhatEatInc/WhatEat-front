import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      pass: "",
      confirm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleChangePass(event) {    this.setState({pass: event.target.value});  }
  handleChangeConfirm(event) {    this.setState({confirm: event.target.value});  }
  handleSubmit(event) {
    if(this.state.pass === this.state.confirm){
      console.log('A name was submitted: ' + this.state.value + "/" +this.state.pass + "/" + this.state.confirm);
      event.preventDefault();
    }
    else{
      console.log("The passwords didn't match!!");
      event.preventDefault();
    }
  }


    render() {
      return (
      <form onSubmit={this.handleSubmit}>
  <label>
    Email:
    <input type="text" name="name" placeholder="put your email here" value={this.state.value} onChange={this.handleChange} required/>
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
</form>);
    }
  }



export default Register 