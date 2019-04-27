import React from 'react';
import GradeSellerModal from './GradeSellerModal';

const BuyItem = (props) => (
  <div className="list-item">
    <div>
      <div>
        <h3 className="list-item__subtitle">Item Info:</h3>
        <h4 className="list-item__text">title: {props.itemName}</h4>
        <h4 className="list-item__text">price: {`$${props.price}`}</h4>
        <h4 className="list-item__text">itemID: {props.itemID}</h4>
      </div>
      <h3 className="list-item__subtitle">Order Status: {props.status}</h3>
      <div>
        <h3 className="list-item__subtitle">Seller Info:</h3>
        <h4 className="list-item__text">username: {props.sellerUsername}</h4>
        <h4 className="list-item__text">userID: {props.seller}</h4>
      </div>
      {
        props.status === "completed" ? (
        <div>
          <GradeSellerModal 
            seller={props.seller} 
            orderID={props.orderID}
          />
        </div>
        ) : ''
      }
    </div>
  </div>
);

export default BuyItem;
