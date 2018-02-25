import React, { Component } from 'react';
import { auth } from '../../service';


class Login extends Component {
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

		auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((user)=>{
          this.props.history.push('/local-bars');
        })
				.catch((err)=>{
					console.log(err.code, err.message)
				})
  }

  render() {
    return (
			<section className="login">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="login-form">
             <h2>Log In</h2>
             <input value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email"/>
             <input value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password"/>
             <button className="login-btn">Log In</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Login;
