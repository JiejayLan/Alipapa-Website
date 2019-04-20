import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';


export const Header = ({startLogout,isAuthenticated,status,userID}={}) => {
  if (isAuthenticated){
    return (  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>Alipapa</h1>
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
        <Link className="header__title" to="/register">
          <h1>sign up</h1>
        </Link>
        <Link className="header__title" to="/login">
          <h1>sign in</h1>
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
  return {isAuthenticated,status,userID};
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);