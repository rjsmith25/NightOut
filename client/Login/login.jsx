import React from 'react';

const Login = () => {
	return (
  	 <section className="login">
			 <form className="login-form">
				  <h2>Log In</h2>
					<input class="emailInput" type="email" placeholder="Email">
	        <input class="passwordInput" type="password" placeholder="Password">
	        <button class="login-btn">Log In</button>
			 </form>
		 </section>
	)
}

export default Login;
