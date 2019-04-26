import React from 'react';

const SellItem = ({buyer, itemID, itemName, price, status}) => (
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
        <h3 className="list-item__subtitle">Buyer Info:</h3>
        <h4 className="list-item__text">username: {buyer.username}</h4>
        <h4 className="list-item__text">userID: {buyer.userID}</h4>
        <h4 className="list-item__text">address: {buyer.address}</h4>
        <h4 className="list-item__data">phone number: {`${buyer.phone_number.substr(0,3)}-${buyer.phone_number.substr(3,3)}-${buyer.phone_number.substr(6,4)}`}</h4>
     </div>
    </div>
  </div>
);

export default SellItem;
