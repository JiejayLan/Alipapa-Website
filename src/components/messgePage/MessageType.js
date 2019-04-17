import React from 'react';


const MessageType = (props)=>{
    let options ="";
    if(props.userType=="SU")
        options =            
         <select name="messageType">      
            <option value="warning">warning</option>
            <option value="message">message</option>
        </select>
    else
        options =            
            <select name="messageType">          
                <option value="appeal">appeal</option>
                <option value="complaint">complaint</option>
                <option value="message">message</option>
            </select>

    return (
        <div onChange={ props.changed }>
                {options}
            <button name = "confirmedType" value={"true"} onClick={props.changed}> Next</button>
        </div>
    )
};


export default MessageType;