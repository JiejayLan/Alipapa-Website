import React from 'react';
import {Link} from 'react-router-dom';

const ProfilePage = ({
  id = '123', 
  name = 'name', 
  password = 'pass', 
  creditCard = '4366234567891234', 
  address = '234 something st. nowhere city NY 11358', 
  phoneNumber = '9176068864'
}) => (
  <div className="content-container">
    <div className="list-header">
      <div className="list-item__title">Profile</div>
    </div>

    <div className="list-body">
      <Link className="list-item--column" to={`/editProfile/${id}`}>
        <h3 className="list-item__title">Name: {name}</h3>
        <h3 className="list-item__title">Password: {password}</h3>
        <h3 className="list-item__title">
          Credit Card: {`${creditCard.substr(0,4)}-${creditCard.substr(4,4)}-${creditCard.substr(8,4)}-${creditCard.substr(12,4)}`}
        </h3>
        <h3 className="list-item__title">Address: {address}</h3>
        <h3 className="list-item__title">
          Phone Number: {`${phoneNumber.substr(0,3)}-${phoneNumber.substr(3,3)}-${phoneNumber.substr(6,4)}`}
        </h3>
      </Link>
    </div>
  </div>
);

export default ProfilePage;