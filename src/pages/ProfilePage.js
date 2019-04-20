import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setProfile} from '../actions/userProfile';
import axios from 'axios';
import { func } from 'prop-types';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: props.profile ? props.profile.address : '',
      phone_number: props.profile ? props.profile.phone_number : '', 
      username: props.profile ? props.profile.username : '', 
      password: props.profile ? props.profile.password : '', 
      credit_card: props.profile ? props.profile.credit_card : ''
    };

    axios.get('/profile').then((response) => {
      this.props.setProfile(response.data);
      this.setState(() => ({...response.data}));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const NAME = this.state.name;
    const PASSWORD = this.state.password;
    const CREDIT_CARD = this.state.credit_card;
    const ADDRESS = this.state.address;
    const PHONE_NUMBER = this.state.phone_number;
    return (
      <div className="content-container">
        <div className="list-header">
          <div className="list-item__title">Profile</div>
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
}

const mapDispatchToProps = (dispatch) => ({
  setProfile: (profile) => dispatch(setProfile(profile))
});

export default connect(undefined, mapDispatchToProps)(ProfilePage);