import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../components/ProfileForm';
import {startEditProfile} from '../actions/auth';
import {usernameUniqueCheck, usernameTabooCheck} from '../actions/usernameCheck';
import {database} from '../firebase/firebase';

const EditProfilePage = (props) => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit your Profile</h1>
        </div>
      </div> 
      <div className="content-container">
        <ProfileForm
          onSubmit={ (auth) => {
            if (props.auth.user_type === "newUser"){
              database.ref(`users/${props.auth.userID}`).update({user_type: "OU"});
            }

            database.ref(`users/${props.auth.userID}`).update({username: ''});
            usernameTabooCheck(auth.username).then((tabooIndex) => {
              if (tabooIndex == -1 ){
                usernameUniqueCheck(auth.username).then((nameIndex)=>{
                  if (nameIndex == -1){
                    props.startEditProfile(auth);
                    props.history.push('/account');
                  } else {
                    alert('Username should be unique!');
                  }
                });
              } else {
                alert('Username should not contains taboo words!');
              }
            });
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditProfile: (auth) => dispatch(startEditProfile(auth))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);