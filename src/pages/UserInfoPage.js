import React from 'react';
import ProfilePage from './ProfilePage';
import {Link} from 'react-router-dom';

const UserInfoPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Your Account</h1>
      </div>
    </div> 

    <div className="content-container">
      <ProfilePage/>
      <div className="list-header">
          <Link className="list-item__title--link" to="/transactionHistory">
            <h1 className="list-item__title ">View Transaction History</h1>
          </Link>
      </div>
    </div>
  </div>
);

export default UserInfoPage;