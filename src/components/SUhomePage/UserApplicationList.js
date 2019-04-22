import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewUserApplication } from '../../actions/SUaction';
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
    }

    renderApplicationList = () => {
        const APPkeys = Object.keys(this.state);
        let APPlist = [];

        for(let i = 0; i < APPkeys.length; i++){
            APPlist.push(this.state[APPkeys[i]]);
        }

        let jsxOUlist = APPlist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.username}>
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
                    <button>approve</button>
                    <button>reject</button>
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
        viewUserApplication: (application) => dispatch( viewUserApplication(application))
    };
};

export default connect(null, mapDispatchToProps)(UserApplicationList);
