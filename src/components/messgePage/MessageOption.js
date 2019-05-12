import React from 'react';


const MessageForm = (props)=>{

    let formOption ="";
    let description =<label className="label">
                        Description
                        <br/>
                        <textarea className="textarea" required name = "description" onChange={ props.changed }/>
                    </label> 
    let compliant = <label className="label">
                        Who do you want to compliant?
                        <input required name = "complaintUser" onChange={ props.changed } />
                    </label> 
    let explain =   <label className="label">
                        Who do you want to explain to?
                        <input required name = "explainUser" onChange={ props.changed } />
                    </label> 
    let receiver =  <label className="label">
                        Receiver
                        <input required name ="receiver" onChange={ props.changed } />
                    </label> 
          
    // console.log(props.userType, props.messageType)

    if((props.userType === "OU" ||props.userType === "VIP")  && props.messageType== "appeal"){
        formOption = description;
    }
    else if((props.userType === "OU" ||props.userType === "VIP") && props.messageType == "complain"){
        formOption = <div>
                        {compliant}
                        {description}    
                    </div>
    }
    else if((props.userType === "OU" ||props.userType === "VIP")  && props.messageType == "explain"){
        formOption = <div>
                        {explain}
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
            <button className="button--secondary" name = "confirmedType" value={false} onClick={props.back}> Back</button>
            <form onSubmit={props.handleSubmit} className="form">
                {formOption} 
                <br/>
                <button type="submit"  className="button" >Submit</button>
            </form>
        </div>
    )
};


export default MessageForm;