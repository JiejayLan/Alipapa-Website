import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../actions/auth';
import { Redirect } from 'react-router-dom'

let renderRedirect = () => {

    return <Redirect to='/login' />
  
}


export const Header = ({startLogout,isAuthenticated}) => {
  if (isAuthenticated){
    return (  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Alipapa</h1>
        </Link>
        
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>)
  }

  else{
    return (  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Alipapa</h1>
        </Link>
        <button className="button button--link" onClick={renderRedirect}>sign up</button>
        <button className="button button--link" onClick={renderRedirect}>Login</button>
      </div>
    </div>
  </header>);
  }

}

;

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(logout())
});

const mapStateToProps = (state) => {
  let isAuthenticated = {
    isAuthenticated: !!state.auth.userID
  }
  return isAuthenticated ;
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);