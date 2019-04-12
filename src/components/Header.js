import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/home">
          <h1>AliPaPa</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);