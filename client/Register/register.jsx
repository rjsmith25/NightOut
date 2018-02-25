import React, { Component } from 'react';
import { auth } from '../../service';


class Register extends Component {
  constructor(props){
    super(props)
		this.state = {
			email: '',
			password: ''
		}

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleEmailChange(e){
		this.setState({
			email: e.target.value
		})
	}

	handlePasswordChange(e){
		this.setState({
			password: e.target.value
		})
	}

	handleSubmit(e){
		e.preventDefault()
		if(!this.state.email && !this.state.password){
			return null;
		}
		auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
				.catch((err)=>{
					console.log(err.code, err.message)
				})
  }

  render() {
    return (
			<section className="register">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="register-form">
             <h2>Sign Up Today</h2>
             <input value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email"/>
             <input value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password"/>
             <button className="register-btn"> Sign Up</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Register;
