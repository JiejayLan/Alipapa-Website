import React from 'react';
import {database} from '../../firebase/firebase';
import {Link} from 'react-router-dom';

class SellItem extends React.Component {
  constructor(props){
    super(props);

    this.state={
      buyerID: this.props.buyerID,
      buyerName: '',
      buyerAddress: '',
      buyerPhoneNumber: '',
      status: this.props.status
    }

    let buyerName = '';
    let buyerAddress = '';
    let buyerPhoneNumber = '';
    var that = this;

    database.ref(`users/${this.props.buyerID}`).once('value').then((snapshot) => {
      const BUYER = snapshot.val();
      buyerName = BUYER.username;
      buyerAddress = BUYER.address;
      buyerPhoneNumber = BUYER.phone_number;
      that.setState({buyerName, buyerAddress, buyerPhoneNumber});
    });

  }

  render() {
    const PHONENUMBER = this.state.buyerPhoneNumber;
    const ORDERID = this.props.itemID;
    return (
      <div className="list-item">
      <div>
        <h3 className="list-item__subtitle">Order Status: {this.props.status}</h3>
        <div>
          <h3 className="list-item__subtitle">Order Info:</h3>
          <h4 className="list-item__text">title: {this.props.itemName}</h4>
          <h4 className="list-item__text">price: {`$${this.props.price}`}</h4>
          <h4 className="list-item__text">itemID: {ORDERID}</h4>
        </div>
        <div>
          <h3 className="list-item__subtitle">Buyer Info:</h3>
          <h4 className="list-item__text">username: {this.state.buyerName}</h4>
          <h4 className="list-item__text">userID: {this.state.buyerID}</h4>
          <h4 className="list-item__text">address: {this.state.buyerAddress}</h4>
          <h4 className="list-item__data">
            phone number: {`${PHONENUMBER.substr(0,3)}-${PHONENUMBER.substr(3,3)}-${PHONENUMBER.substr(6,4)}`}
          </h4>
        </div>
        {
          this.state.status === "pending" ? (
            <div>
            <Link className="button" to={`/sellerapprove/${ORDERID}`}>
              Approve Buyer
            </Link>
            </div>
          ) : ''
        }
      </div>
    </div>
    );
  }
}

export default SellItem;
