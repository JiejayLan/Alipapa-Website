import React from 'react';


const MessageType = (props)=>{
    let options ="";
    if(props.userType=="SU")
        options =            
         <select className="select" name="messageType">      
            <option value="warning">warning</option>
            <option value="message">message</option>
        </select>
    else
        options =            
            <select className="select" name="messageType">          
                <option value="appeal">appeal</option>
                <option value="complain">complaint</option>
                <option value="explain">explain</option>
                <option value="message">message</option>
            </select>

    return (
        <div onChange={ props.changed }>
                {options}
            <button 
                className= "button"
                name = "confirmedType" 
                value={"true"} 
                onClick={props.changed}
            >
                 Next
            </button>
        </div>
    )
};


export default MessageType;