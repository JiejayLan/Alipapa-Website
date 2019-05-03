import React from 'react';
import ProfilePage from './ProfilePage';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import SubmittedItemApp from '../components/SubmittedItemApp';

class UserInfoPage extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      userID: props.auth.userID,
      onSellItems: []
    };
  
    axios.post('/account', {
      userID: this.state.userID
    }).then((response) => {
      console.log(response.data);
      this.setState({onSellItems: response.data});
    }).catch( err =>{
      console.log(err);
    });
  }

  render() {
    const ITEMS = this.state.onSellItems;
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
          {this.props.auth.user_type === "VIP OU"? (
            <h1 className="page-header__title">Your VIP Account</h1>
          ): (
            <h1 className="page-header__title">Your Account</h1>
          )}
            
          </div>
        </div> 

        <div className="content-container">
          <ProfilePage/>
          
          <div>
            <div className="list-header">
              <h2 className="list-item__title">On Sell Items</h2>
            </div>
            <div className="list-body">
              { ITEMS.length === 0 ? (
                  <div className="list-item list-item--message">
                    <h3>No on sell items</h3>
                  </div>
                ) : (
                  ITEMS.map((item) => {
                    return <SubmittedItemApp key={item.itemID} {...item}/>
                  })
                )
              }
            </div>
          </div>
          
          <div className="list-header">
              <Link className="list-item__title--link" to="/transactionHistory">
                <h1 className="list-item__title ">View Transaction History</h1>
              </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserInfoPage);