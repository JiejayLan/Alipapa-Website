import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import {startAddApplication} from '../actions/application';

const RegisterPage = (props) => {
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
              props.history.push('/home');
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