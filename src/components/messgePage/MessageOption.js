import React from 'react';


const MessageForm = (props)=>{

    let formOption ="";
    let description =<label>
                        Description
                        <textarea required name = "description" onChange={ props.changed } />
                    </label> 
    let compliant = <label>
                        Who you want to compliant/explain?
                        <input required name = "complaintedUserID" onChange={ props.changed } />
                    </label> 
    let receiver =  <label>
                        receiver
                        <input required name ="receiver" onChange={ props.changed } />
                    </label> 
          
    // console.log(props.userType, props.messageType)

    if(props.userType == "OU" && props.messageType== "appeal"){
        formOption = description;
    }
    else if(props.userType === "OU" && props.messageType == "complaint"){
        formOption = <div>
                        {compliant}
                        {description}    
                    </div>
    }
    else{
        formOption =<div>
                        {receiver}
                        {description}                  
                    </div>
    }
    return (
        <div>
            <button name = "confirmedType" value={false} onClick={props.back}> back</button>
            <form onSubmit={props.handleSubmit} className="form">
                {formOption} 
                <br/>
                <button type="submit"  className="button" >submit</button>
            </form>
        </div>
    )
};


export default MessageForm;