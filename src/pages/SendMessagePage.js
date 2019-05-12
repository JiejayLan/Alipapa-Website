import React from 'react';
import { connect } from 'react-redux';
import  MessageType from "../components/messgePage/MessageType.js"
import  MessageOption from "../components/messgePage/MessageOption.js";
import { warnUser } from '../actions/SUaction';
import axios from 'axios';

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageType:"appeal",
            sender:'',
            complaintUser:'',
            explainUser:'',
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
        console.log(this.state)
    }

    //event for back button
    handleback = () => {
        console.log(this.state);
        if(this.props.user.user_type == 'OU' || this.props.user.user_type == 'VIP')
            this.setState({messageType:"appeal",confirmedType:"false"});
        else
            this.setState({messageType:"warning",confirmedType:"false"});
    }

    handleSubmit(event) {  
        event.preventDefault();
        let message ={};

        if(this.state.messageType === "complain"){
            message.receiver = "SU";
            message.status = "suspended";
            message.complaintUser= this.state.complaintUser;
        }
        else if(this.state.messageType ==="explain"){
            message.receiver = "SU";
            message.explainUser = this.state.explainUser;
        }
        else if(this.state.messageType ==="warning" || this.state.messageType ==="message"){
            message.receiver= this.state.receiver;
        }
        else if(this.state.messageType ==="appeal")
            message.receiver = "SU";


        message.description = this.state.description;
        message.messageType = this.state.messageType;
        message.sender = this.state.sender;
        axios.post('/message/send', {
            ...message
          })
          .then( (response)=> {
            if(message.messageType === 'warning'){
                this.props.warnUser(this.state.receiver);
            }
            console.log(response);
            this.props.history.push('/sendMessage')
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
            <div>
                <div className="page-header">
                    <div className="content-container"> 
                        <h1 className="page-header__title">Message Form</h1> 
                    </div>
                </div>   
                
                <div className="content-container">
                    {renderComponent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    user: state.auth
});

const mapDispatchToProps = (dispatch) => {
    return {
        warnUser: (user) => dispatch( warnUser(user) )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
