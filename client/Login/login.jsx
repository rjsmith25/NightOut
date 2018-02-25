import React from 'react';

const Login = () => {
	return (
  	 <section className="login">
			 <div className="container">
				 <form className="login-form">
					  <h2>Log In</h2>
						<input class="emailInput" type="email" placeholder="Email" />
		        <input class="passwordInput" type="password" placeholder="Password" />
		        <button class="login-btn">Log In</button>
				 </form>
			 </div>
		 </section>
	)
}

export default Login;
