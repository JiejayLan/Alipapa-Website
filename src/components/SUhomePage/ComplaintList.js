import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { justifyComp, removeComp } from '../../actions/SUaction';


class ComplaintList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.redirect = false;

        axios.post('/suhome', { datatype: 'COMP'}).then( (resp)=>{
            //this.props.viewItemApplication(resp.data);
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    }

    setRedirect = () => {
        if(confirm('Send a message to the user about more info. This will redirect you to the message system! Please remember the username!')){
            this.redirect = true;
            this.setState({...this.state});
        }
    }

    investigateRedirect = () => {
        if(this.redirect){
            return <Redirect to='/message' />
        };
    }

    justifyHandler = (uid) => {
        if(this.state[uid].status === 'justified'){
            alert('Already justified!');
        }
        else if(confirm('Make sure you contact the user to investigate the complain before confirm it')){
            this.props.justifyComp(uid);
            this.setState({...this.state});
        };
    }

    removeHandler = (uid) => {
        if(confirm('Sure removing this complaint?')){
            this.props.removeComp(uid);

            delete this.state[uid];
            let newState = this.state;
            this.setState({...newState});
        }
    }

    renderComplaintList = () => {
        const Compkeys = Object.keys(this.state);
        let Complist = [];

        for(let i = 0; i < Compkeys.length; i++){
            if(this.state[Compkeys[i]].messageType === 'complain'){
                this.state[Compkeys[i]].uid = Compkeys[i];
                Complist.push(this.state[Compkeys[i]]);
            }
            else 
                delete this.state[Compkeys[i]];
        }

        let jsxOUlist = Complist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>{application.messageType}:</span>
                    <br />
                    sender: {application.sender}<br />
                    receiver: {application.receiver}<br />
                    status: {application.status}<br /><br />
                    {application.description}<br /><br />
                </div>
                <div className='card-action'>
                    <button onClick={()=>this.justifyHandler(application.uid)}>justify</button>
                    <button onClick={this.setRedirect}>investigate</button>
                    <button onClick={()=>this.removeHandler(application.uid)}>remove</button>
                </div>
            </div>
            </div>
        );

        return jsxOUlist;
    };


    render(){

        let resultList = this.renderComplaintList();

        return(
            <div>
                {this.investigateRedirect()}
                {resultList}
            </div>
        );
    };
};

/*const mapStateToProps = (state) => ({
    Users: state.SUmanagement
});*/

const mapDispatchToProps = (dispatch) => {
    return {
        viewItemApplication: (application) => dispatch( viewItemApplication(application)),
        justifyComp: (compid) => dispatch( justifyComp(compid) ),
        removeComp: (compid) => dispatch( removeComp(compid) )
    };
};

export default connect(null, mapDispatchToProps)(ComplaintList);
