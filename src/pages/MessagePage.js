import React from 'react';
import { connect } from 'react-redux';
import  MessageType from "../components/messgePage/MessageType.js"
import  MessageForm from "../components/messgePage/MessageForm.js"
class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageType:"",
            sender:'',
            complaintUserID:'',
            receiver:'',
            description:"",
            confirmedType:false,
            userType:'SU'
        };
    }

    componentWillMount(){
        this.setState({
            userType:this.props.user.user_type
        })
    }

    handleUpdate = (event) => {
        console.log("update state",event.target.name,event.target.value)
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleSubmit() {  

    
    }


    render() {
        let renderComonent ="";
        if(this.state.confirmedType)
            renderComonent =<form >
                                <button type="button" onClick={()=>this.handleSubmit()} >submit</button>
                            </form>
        else
            renderComonent = 
            <MessageType changed={(event)=>{this.handleUpdate(event)}} userType = {this.state.userType}/>

        return (
            <div>
                <h1>Message Form</h1>               
                {renderComonent}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth
  });


export default connect(mapStateToProps)(MessageForm);
