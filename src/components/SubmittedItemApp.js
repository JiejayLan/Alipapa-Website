import React from 'react';
import {Link} from 'react-router-dom';

const SubmittedItemApp = ({itemID,title, keywords}) => {
  const KEYWORDS = keywords ?  Object.keys(keywords) : [''] ;
  console.log(KEYWORDS);
  return (
      <Link className="list-item--column" to={`/editItem/${itemID}`}>
      <div>
      <h3 className="list-item__subtitle">Title: {title}</h3>
      </div>
      
      <div>
        <h3 className="list-item__subtitle">Keywords:</h3>
        <h4 className="list-item__text">{KEYWORDS.join(", ")}</h4>
       </div>
      </Link>
  );
}

export default SubmittedItemApp;