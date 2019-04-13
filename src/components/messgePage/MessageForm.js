import React from 'react';


const MessageForm = (props)=>{



    return (
        <form >
            <input> receiver</input>
            <input> Description</input>
            <button type="button" onClick={()=>this.handleSubmit()} >submit</button>
        </form>
    )
};


export default MessageForm;