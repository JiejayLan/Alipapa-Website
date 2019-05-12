import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';
import { database} from '../firebase/firebase';

export const Header = ({startLogout,isAuthenticated,status,userID,user_type}={}) => {

  if (isAuthenticated){
    if(user_type === "OU" || user_type === "VIP"){
      return (  <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/">
            <h1>Alipapa</h1>
          </Link> 
          <Link className="header__link" to="/checkMessage">
            Message
          </Link>    
          <Link className="header__link" to="/account">
            Account
          </Link>    
          <button className="button button--link" onClick={()=>startLogout({status,userID})}>Logout</button>
        </div>
      </div>
    </header>)
    }
    else{
      return (  <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/">
            <h1>Alipapa</h1>
          </Link> 
          <Link className="header__link" to="/suhome">
            SUhome
          </Link>  
          <Link className="header__link" to="/checkMessage">
            Message
          </Link>    
          <Link className="header__link" to="/account">
            Account
          </Link>    
          <button className="button button--link" onClick={()=>startLogout({status,userID})}>Logout</button>
        </div>
      </div>
    </header>)      
    }

  }
  else{
    return (  
      <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>Alipapa</h1>
        </Link>
        <Link className="header__link" to="/register">
          Register
        </Link>
        <Link className="header__link" to="/login">
         Login
        </Link>
      </div>
    </div>
  </header>);
  }

};

const mapDispatchToProps = (dispatch) => ({
  startLogout: (data) => dispatch(logout(data))
});

const mapStateToProps = (state) => {
  
  let isAuthenticated = !!state.auth.userID
  let status = state.auth.status;
  let userID = state.auth.userID;
  let user_type = state.auth.user_type;
  return {isAuthenticated,status,userID,user_type};
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);