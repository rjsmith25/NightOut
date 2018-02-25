import React from 'react';

const Register = () => {
	return (
  	 <section className="register">
       <div className="container">
         <form className="register-form">
            <h2>Sign Up Today</h2>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button className="register-btn"> Sign Up</button>
         </form>
       </div>
     </section>
	)
}

export default Register;
