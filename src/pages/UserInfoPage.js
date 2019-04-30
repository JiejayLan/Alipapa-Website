import React from 'react';
import ProfilePage from './ProfilePage';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const UserInfoPage = (props) => {

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
        {props.auth.user_type === "VIP OU"? (
          <h1 className="page-header__title">Your VIP Account</h1>
        ): (
          <h1 className="page-header__title">Your Account</h1>
        )}
          
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
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserInfoPage);