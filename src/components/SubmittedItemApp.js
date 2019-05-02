import React from 'react';
import {Link} from 'react-router-dom';

const SubmittedItemApp = ({keywords}) => {
  //change "to=" attribute to redirect to edit item form
  
  const KEYWORDS = Object.keys(keywords);
  return (
      <Link className="list-item" to="/account">
      <div>
        <h3 className="list-item__subtitle">Keywords:</h3>
        <h4 className="list-item__text">{KEYWORDS.join(", ")}</h4>
       </div>
      </Link>
  );
}

export default SubmittedItemApp;