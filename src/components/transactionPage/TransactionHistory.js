import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SellItem from './SellItem';
import BuyItem from './BuyItem';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userID: props.auth.userID,
      sellItem: [],
      buyItem: []
    };

    axios.all([
      axios.post('/transactionHistory', {
        userID: this.state.userID,
        datatype: 'SELLING_ITEMS'
      }),
      axios.post('/transactionHistory', {
        userID: this.state.userID,
        datatype: 'BUYING_ITEMS'
      })
    ]).then(axios.spread( (sellRes, buyRes) => {
      console.log(sellRes.data);
      console.log(buyRes.data);
      this.setState({sellItem: sellRes.data});
      this.setState({buyItem: buyRes.data});
    })).catch( err =>{
      console.log(err);
    });
  }

  render() {
    const SELLITEM = this.state.sellItem;
    const BUYITEM = this.state.buyItem;
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Your Transaction History</h1>
          </div>
        </div> 

        <div className="content-container">
          <div className="list-header">
            <h2 className="list-item__title">Buying Items</h2>
          </div>
          <div className="list-body">
          {
            BUYITEM.length === 0 ? (
              <div className="list-item list-item--message">
                <h3>No buying items</h3>
              </div>
            ) : (
              BUYITEM.map((item) => {
                return <BuyItem key={item.itemID} {...item}/>
              })
            )
          }
          </div>
          <div className="list-header">
            <h2 className="list-item__title">Selling Items</h2>
          </div>
          <div className="list-body">
            {
              SELLITEM.length === 0 ? (
                <div className="list-item list-item--message">
                  <h3>No selling items</h3>
                </div>
              ) : (
                SELLITEM.map((item) => {
                  return <SellItem key={item.itemID} {...item}/>
                })
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TransactionHistory);