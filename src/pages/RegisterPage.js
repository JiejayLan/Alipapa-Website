import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import {startAddApplication} from '../actions/application';
import {usernameUniqueCheck, usernameTabooCheck, usernameBlacklistCheck} from '../actions/usernameCheck';

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
              usernameBlacklistCheck(application.username).then((index) => {
                if (index == -1){
                  usernameTabooCheck(application.username).then((tabooIndex) => {
                    if (tabooIndex == -1 ){
                      usernameUniqueCheck(application.username).then((nameIndex)=>{
                        if (nameIndex == -1){
                          props.startAddApplication(application); 
                          props.history.push('/');
                        } else {
                          alert('Username should be unique!');
                        }
                      });
                    } else {
                      alert('Username should not contains taboo words!');
                    }
                  });
                } else if(index != -1) {
                  alert('You are blocked by the system!')
                }
              });
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