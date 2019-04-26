import React from 'react';

const BuyItem = ({seller, itemID, itemName, price, status}) => (
  <div className="list-item">
    <div>
      <div>
        <h3 className="list-item__subtitle">Item Info:</h3>
        <h4 className="list-item__text">title: {itemName}</h4>
        <h4 className="list-item__text">price: {`$${price}`}</h4>
        <h4 className="list-item__text">itemID: {itemID}</h4>
      </div>
      <h3 className="list-item__subtitle">Order Status: {status}</h3>
      <div>
        <h3 className="list-item__subtitle">Seller Info:</h3>
        <h4 className="list-item__data">userID: {seller}</h4>
      </div>
    </div>
  </div>
);

export default BuyItem;
