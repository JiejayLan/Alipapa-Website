import React from 'react';
import ProfilePage from './ProfilePage';

const UserInfoPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Your Account</h1>
      </div>
    </div> 

    <div className="content-container">
      <ProfilePage/>
    </div>
  </div>
);

export default UserInfoPage;