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
      <Redirect to="/dashboard"/>
    ) : (
      <Component {...props}/>
    )
  )}/>
);

const mapStateToProps = (state) => {

  let isAuthenticated = {
    isAuthenticated: state.userID !==""
  }
  console.log(isAuthenticated,state);
  return isAuthenticated ;
}

export default connect(mapStateToProps)(LoginRoute);