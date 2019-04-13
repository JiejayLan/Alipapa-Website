import React from 'react';
import { connect } from 'react-redux';
import  MessageType from "../components/messgePage/MessageType.js"
import  MessageOption from "../components/messgePage/MessageOption.js"

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageType:"appeal",
            sender:'',
            complaintedUserID:'',
            receiver:'',
            description:"",
            confirmedType:"false",
            userType:'SU'
        };
    }

    componentWillMount(){
        this.setState({
            userType:this.props.user.user_type
        })
    }

    handleUpdate = (event) => {
        console.log("update state",event.target.name," ",event.target.value)
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleSubmit(event) {  
        event.preventDefault();
        console.log("submit");
        this.props.history.push('/message')
    }

    render() {
        let renderComonent ="";
        if(this.state.confirmedType ==="false")
            renderComonent = 
                <MessageType changed={(event)=>{this.handleUpdate(event)}}
                            userType = {this.state.userType}  
                             
                />
        else
            renderComonent =
                <MessageOption userType = {this.state.userType}
                    changed={(event)=>{this.handleUpdate(event)}}  
                    messageType={this.state.messageType}
                    handleSubmit={(event)=>{this.handleSubmit(event)}}>
                </MessageOption>

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
