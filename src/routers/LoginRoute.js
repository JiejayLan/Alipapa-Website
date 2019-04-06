import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const LoginRoute = ({
  isAuthenticated, 
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/"/>
    ) : (
      <Component {...props}/>
    )
  )}/>
);

const mapStateToProps = (state) => {

  let isAuthenticated = {
    isAuthenticated: !!state.auth.userID
  }
  return isAuthenticated ;
}

export default connect(mapStateToProps)(LoginRoute);