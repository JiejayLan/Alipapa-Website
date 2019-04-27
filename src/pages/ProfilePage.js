import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const ProfilePage = (props) => {
    const NAME = props.auth.username;
    const PASSWORD = props.auth.password;
    const CREDIT_CARD = props.auth.credit_card;
    const ADDRESS = props.auth.address;
    const PHONE_NUMBER = props.auth.phone_number;
    return (
      <div>
        <div className="list-header">
          <h2 className="list-item__title">Profile</h2>
        </div>

        <div className="list-body">
          <Link className="list-item--column" to={`/editProfile`}>
            <h3 className="list-item__title">Name: {NAME}</h3>
            <h3 className="list-item__title">Password: {PASSWORD}</h3>
            <h3 className="list-item__title">
              Credit Card: {`${CREDIT_CARD.substr(0,4)}-${CREDIT_CARD.substr(4,4)}-${CREDIT_CARD.substr(8,4)}-${CREDIT_CARD.substr(12,4)}`}
            </h3>
            <h3 className="list-item__title">Address: {ADDRESS}</h3>
            <h3 className="list-item__title">
              Phone Number: {`${PHONE_NUMBER.substr(0,3)}-${PHONE_NUMBER.substr(3,3)}-${PHONE_NUMBER.substr(6,4)}`}
            </h3>
          </Link>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProfilePage);