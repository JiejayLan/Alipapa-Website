import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewUserApplication, ApproveUserApplication, DenyUserApplication } from '../../actions/SUaction';
import axios from 'axios';

class UserApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        axios.post('/suhome', { datatype: 'OUAPP'}).then( (resp)=>{
            //console.log(resp.data);
            this.props.viewUserApplication(resp.data);
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    };

    approveHandler = (uid) => {
        if (confirm("Are you sure to approve?")){
            this.props.ApproveUserApplication(this.state[uid]); 

            delete this.state[uid];

            let newState = this.state;
            this.setState({...newState});
        }
    };

    rejectHandler = (uid) => {
        if (confirm("Are you sure to reject?")){
            this.props.DenyUserApplication(uid);

            delete this.state[uid];

            let newState = this.state;
            this.setState({...newState});
        }
    };

    renderApplicationList = () => {
        const APPkeys = Object.keys(this.state);
        let APPlist = [];

        for(let i = 0; i < APPkeys.length; i++){
            this.state[APPkeys[i]].uid = APPkeys[i];
            APPlist.push(this.state[APPkeys[i]]);
        }

        let jsxOUlist = APPlist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>New Application!</span>
                    <br />
                    {application.username}<br />
                    {application.address}<br />
                    {application.credit_card}<br />
                    {application.phone_number}<br />
                </div>
                <div className='card-action'>
                    <button className="btn btn-outline-success" 
                        onClick={()=>this.approveHandler(application.uid)}>approve</button>
                    <button className="btn btn-outline-danger" 
                        onClick={()=>this.rejectHandler(application.uid)}>reject</button>
                </div>
            </div>
            </div>
        );

        return jsxOUlist;
    };


    render(){

        let resultList = this.renderApplicationList();

        return(
            <div>
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
        viewUserApplication: (application) => dispatch( viewUserApplication(application)),
        ApproveUserApplication: (application) => dispatch( ApproveUserApplication(application)),
        DenyUserApplication: (application) => dispatch( DenyUserApplication(application))
    };
};

export default connect(null, mapDispatchToProps)(UserApplicationList);
