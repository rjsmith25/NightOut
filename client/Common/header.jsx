import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
	 <header>
		<nav className="container">
		   <div className="nav-logo">
		    <Link className="brand" to="/">Night Out <i className="fa fa-glass" aria-hidden="true"></i></Link>
		   </div>
  			<ul className="navbar-right">
  				<li><a href="">Sign In</a></li>
  				<li><a href="">Sign Up</a></li>
  			</ul>
		</nav>
	</header>
  )
}

export default Header
