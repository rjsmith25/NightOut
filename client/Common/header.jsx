import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../service';

const Header = (props) => {
  function signOut(){
    auth.signOut()
  }

  function renderContent(user){
    let Content = null;
    if(user){
      return Content = (
        <li><a onClick={signOut} href="#">Sign Out</a></li>
      )
    }else {
      return Content = (
       <div>
         <li><Link to="/login">Sign In</Link></li>
         <li><Link to="/register">Sign Up</Link></li>
       </div>
     )
    }
  }

  return (
	 <header>
		<nav className="container">
		   <div className="nav-logo">
		    <Link className="brand" to="/">Night Out <i className="fa fa-glass" aria-hidden="true"></i></Link>
		   </div>
  			<ul className="navbar-right">
          {renderContent(props.user)}
  			</ul>
		</nav>
	</header>
  )
}

export default Header
