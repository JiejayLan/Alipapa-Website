import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SubmittedItemApp extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      
    }
  }
  
  render() {
  return (
    <div>
    <div className="list-header">
      <h2 className="list-item__title">Submitted Item Applications</h2>
    </div>

    <div className="list-body">
      <Link className="list-item--column">
        <h3 className="list-item__title"></h3>
        <h3 className="list-item__title"></h3>
        <h3 className="list-item__title">
          
        </h3>
        <h3 className="list-item__title"></h3>
        <h3 className="list-item__title">
        
        </h3>
      </Link>
    </div>
  </div>
  );
  }
}

export default SubmittedItemApp;