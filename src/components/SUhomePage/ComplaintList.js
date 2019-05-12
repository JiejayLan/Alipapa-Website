import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { justifyComp, removeComp, ApealApprove } from '../../actions/SUaction';

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

    /*async nameHandler(id){
       await checkUsername(id).then( (value)=> {
         this.placeholder = value;
       });
    }*/

    Appealhandler = (appid) => {
        if(confirm('Sure want to approve this appeal?')){
            this.props.ApealApprove(appid);

            delete this.state[appid];
            let newState = this.state;
            this.setState({...newState});
        }
    }

    renderComplaintList() {
        const Compkeys = Object.keys(this.state);
        let Complist = [];

        for(let i = 0; i < Compkeys.length; i++){
            if(this.state[Compkeys[i]].messageType === 'complain'){
                //this.state[Compkeys[i]].receiver = this.nameHandler(this.state[Compkeys[i]].receiver);
                //let a = await checkUsername(this.state[Compkeys[i]].sender);
                //this.state[Compkeys[i]].sender = a;
                //console.log(this.state[Compkeys[i]].sender);
                this.state[Compkeys[i]].uid = Compkeys[i];
                Complist.push(this.state[Compkeys[i]]);
            }
            else if(this.state[Compkeys[i]].messageType === 'appeal') continue;
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
                    <button className="btn btn-outline-success" 
                        onClick={()=>this.justifyHandler(application.uid)}>justify</button>
                    <button className='btn btn-outline-info' 
                        onClick={this.setRedirect}>investigate</button>
                    <button className="btn btn-outline-danger" 
                        onClick={()=>this.removeHandler(application.uid)}>remove</button>
                </div>
            </div>
            </div>
        );

        return jsxOUlist;
    };

    renderApealList =() =>{
        const Compkeys = Object.keys(this.state);
        let Applist = [];

        for(let i = 0; i < Compkeys.length; i++){
            if(this.state[Compkeys[i]].messageType === 'complain') continue;
            else if(this.state[Compkeys[i]].messageType === 'appeal'){
               // this.state[Compkeys[i]].receiver = this.nameHandler(this.state[Compkeys[i]].receiver);
               // this.state[Compkeys[i]].sender = this.nameHandler(this.state[Compkeys[i]].sender);
                this.state[Compkeys[i]].uid = Compkeys[i];
                Applist.push(this.state[Compkeys[i]]);
            }
            else 
                delete this.state[Compkeys[i]];
        }

        let jsxOUlist2 = Applist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>{application.messageType}:</span>
                    <br />
                    username: {application.sender}<br />
                    <br />
                    {application.description}<br /><br />
                </div>
                <div className='card-action'>
                    <button onClick={()=>this.Appealhandler(application.uid)}>approve</button>
                    <button onClick={()=>this.removeHandler(application.uid)}>reject</button>
                </div>
            </div>
            </div>
        );

        return jsxOUlist2;
    }


    render(){

        let resultList = this.renderComplaintList();

        let resultList2 = this.renderApealList();

        return(
            <div>
                {this.investigateRedirect()}
                {resultList}
                {resultList2}
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
        removeComp: (compid) => dispatch( removeComp(compid) ),
        ApealApprove: (appid) => dispatch( ApealApprove(appid) )
    };
};

export default connect(null, mapDispatchToProps)(ComplaintList);
