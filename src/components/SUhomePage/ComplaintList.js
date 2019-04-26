import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import axios from 'axios';
import { Redirect } from 'react-router-dom';


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

    renderComplaintList = () => {
        const Compkeys = Object.keys(this.state);
        let Complist = [];

        for(let i = 0; i < Compkeys.length; i++){
            this.state[Compkeys[i]].uid = Compkeys[i];
            Complist.push(this.state[Compkeys[i]]);
        }

        let jsxOUlist = Complist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>Complain to {application.complained_userID}:</span>
                    <br />
                    {application.description}<br />
                </div>
                <div className='card-action'>
                    <button>justify</button>
                    <button onClick={this.setRedirect}>investigate</button>
                    <button>remove</button>
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
        viewItemApplication: (application) => dispatch( viewItemApplication(application))
    };
};

export default connect(null, mapDispatchToProps)(ComplaintList);
