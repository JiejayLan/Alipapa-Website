import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import {startAddApplication} from '../actions/application';

const RegisterPage = (props) => {
  // onSubmit = (application) => {
  //   //router properties to programmatically 
  //   //switch to dashboard page
  //   console.log('reaches before start add app');
  //   this.props.startAddApplication(application); //ERR this line
  //   this.props.history.push('/dashboard');
  // }
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Register Page</h1>
          </div>
        </div> 
        <div className="content-container">
          <RegisterForm
            onSubmit={ (application) => {
              console.log('reaches before start add app');
              props.startAddApplication(application); 
              props.history.push('/dashboard');
            }}
          />
        </div>
      </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
  startAddApplication: (application) => dispatch(startAddApplication(application))
});

export default connect(undefined, mapDispatchToProps)(RegisterPage);