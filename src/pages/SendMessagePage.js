import React from 'react';
import { connect } from 'react-redux';
import  MessageType from "../components/messgePage/MessageType.js"
import  MessageOption from "../components/messgePage/MessageOption.js"
import axios from 'axios';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageType:"appeal",
            sender:'',
            complaintedUsername:'',
            explainUsername:'',
            receiver:'',
            description:"",
            confirmedType:"false",
            userType:'SU'
        };
    }

    componentWillMount(){
        this.setState({
            userType:this.props.user.user_type,
            sender:this.props.user.username
        })
        if(this.props.user.user_type == 'SU')
            this.setState({messageType:"warning"});
    }

    handleUpdate = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    //event for back button
    handleback = () => {
        if(this.props.user.user_type == 'OU')
            this.setState({messageType:"appeal",confirmedType:"false"});
        else
            this.setState({messageType:"warning",confirmedType:"false"});
    }

    handleSubmit(event) {  
        event.preventDefault();
        let message ={};

        if(this.state.messageType === "complain"){
            message.receiver = "SU";
            message.complaintedUsername = this.state.complaintedUsername;
        }
        else if(this.state.messageType ==="explain"){
            message.receiver = "SU";
            message.explainUsername = this.state.explainUsername;
        }
        else if(this.state.messageType ==="warning" || this.state.messageType ==="message"){
            message.receiver= this.state.receiver;
        }
        else if(this.state.messageType ==="appeal")
            message.receiver = "SU";


        message.description = this.state.description;
        message.messageType = this.state.messageType;
        message.senderUserType = this.state.userType;
        message.sender = this.state.sender;
        axios.post('/message/send', {
            ...message
          })
          .then( (response)=> {
            console.log(response);
            this.props.history.push('/message')
          })
          .catch(function (error) {
            console.log(error);
          });    
    }

    render() {
        let renderComponent ="";
        if(this.state.confirmedType ==="false")
            renderComponent = 
                <MessageType changed={(event)=>{this.handleUpdate(event)}}
                            userType = {this.state.userType}                     
                />
        else
            renderComponent =
                <MessageOption userType = {this.state.userType}
                    changed={(event)=>{this.handleUpdate(event)}}  
                    back={()=>{this.handleback()}}  
                    messageType={this.state.messageType}
                    handleSubmit={(event)=>{this.handleSubmit(event)}}>
                </MessageOption>

        return (
            <div className="content-container">
                <h1 className="page-header">Message Form</h1>               
                {renderComponent}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth
});


export default connect(mapStateToProps)(MessageForm);
