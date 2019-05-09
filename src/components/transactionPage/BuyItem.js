import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import {database} from '../../firebase/firebase';
import {VIPCheckRating} from '../../actions/VIPCheck';

class BuyItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false,
      sellerID: this.props.sellerID,
      sellerName: '',
      userID: this.props.auth.userID,
      orderID: this.props.itemID,
      rating: '',
      status: this.props.status
    }

    let sellerName = '';
    var that = this;

    database.ref(`users/${this.props.sellerID}`).once('value').then((snapshot) => {
      const SELLER = snapshot.val();
      sellerName = SELLER.username;
      console.log(sellerName);
  
      that.setState({sellerName});
    });

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    let modalIsOpen = true;
    this.setState(() => ({modalIsOpen}));
  }

  closeModal() {
    let modalIsOpen = false;
    const SELLER = this.state.sellerID;
    const USERID = this.state.userID;
    const RATING = this.state.rating;
    const ORDERID = this.state.orderID;
    let counter = 0;
    let avgRating = 0;

    if (RATING !== ''){
      database.ref(`users/${SELLER}/grade`).update({[USERID]: RATING});

      database.ref(`users/${SELLER}/grade`).once('value').then((snapshot) => {
        const GRADES = snapshot.val();
        console.log(GRADES);
        for (let grade in GRADES){
          avgRating += GRADES[grade]; 
          counter += 1;
        }
        avgRating /= counter;
        database.ref(`users/${SELLER}`).update({rating: avgRating});
      });

      database.ref(`orders/${ORDERID}`).update({status: "rated"});

      VIPCheckRating(SELLER);
      this.setState(() => ({modalIsOpen, status: "rated"}));
    }

    this.setState(() => ({modalIsOpen}));
  }

  handleOptionChange = (e) => {
    let rating = parseInt(e.target.value);
    this.setState(() => ({rating}));
  }


 render(){
   return (
  <div className="list-item">
    <div>
      <h3 className="list-item__subtitle">Order Status: {this.state.status}</h3>
      <div>
        <h3 className="list-item__subtitle">Item Info:</h3>
        <h4 className="list-item__text">title: {this.props.itemName}</h4>
        <h4 className="list-item__text">price: {`$${this.props.price}`}</h4>
        <h4 className="list-item__text">itemID: {this.props.itemID}</h4>
      </div>
      <div>
        <h3 className="list-item__subtitle">Seller Info:</h3>
        <h4 className="list-item__text">username: {this.state.sellerName}</h4>
        <h4 className="list-item__text">userID: {this.props.sellerID}</h4>
      </div>
      {
        this.state.status === "completed" ? (
        <div>
        <div>
        <button className="button" onClick={this.openModal}>
          Grade seller
        </button>
        <Modal 
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Select Your Rating"
        >
          <h2 className="list-item__title ">Select Your Rating</h2>
          <p className="list-item__sub-title">1 being the worst and 5 being the best</p>
          
          <div>
            <label className="label">
              <input 
                type="radio" 
                selected 
                value="1"
                checked={this.state.rating === 1}
                onChange={this.handleOptionChange}
              />
              1
            </label>

            <label className="label">
              <input 
                type="radio" 
                value="2"
                checked={this.state.rating === 2}
                onChange={this.handleOptionChange}
              />
              2
            </label>

            <label className="label">
              <input 
                type="radio" 
                value="3"
                checked={this.state.rating === 3}
                onChange={this.handleOptionChange}
                />
              3
            </label>
          
            <label className="label">
              <input 
                type="radio" 
                value="4"
                checked={this.state.rating === 4}
                onChange={this.handleOptionChange}
              />
              4
            </label>

                      
            <label className="label">
              <input 
                type="radio" 
                value="5"
                checked={this.state.rating === 5}
                onChange={this.handleOptionChange}
              />
              5
            </label>
          </div>

          <button className="button" onClick={this.closeModal}>Submit</button>
        </Modal>
      </div>
        </div>
        ) : ''
      }

      {
        this.state.status === "approved" ? (
          <div>
          <Link className="button" to={'/transactionHistory'}>
            Order Checkout
          </Link>
          </div>
        ) : ''
      }
    </div>
  </div>
   );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BuyItem);
