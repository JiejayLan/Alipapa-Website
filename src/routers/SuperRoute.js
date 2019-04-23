import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const SuperRounte = ({
    isAuthenticatedandSuper,
    component: Component,
    ...rest
  }) => (
    <Route {...rest} component={(props) => (
      isAuthenticatedandSuper ? (
        <div>
          <Header/>
          <Component {...props}/>
        </div>
      ) : (
        <Redirect to="/"/>
      )
    )}/>
  );
  
  const mapStateToProps = (state) => {
    let isAuthenticatedandSuper = {
      isAuthenticatedandSuper: !!state.auth.userID && state.auth.user_type === 'SU'
    }
    return isAuthenticatedandSuper ;
  }
  
  export default connect(mapStateToProps)(SuperRounte);