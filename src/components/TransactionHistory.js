import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: props.auth.username,
      sellingItems: [],
      buyingItems: []
    }
  }

  render() {
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
            <div className="list-item--column">
              item1
            </div>
          </div>
          <div className="list-header">
            <h2 className="list-item__title">Selling Items</h2>
          </div>
          <div className="list-body">
            <div className="list-item--column">
              item1
            </div>
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