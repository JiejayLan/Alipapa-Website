import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewItemApplication, DenyItemApplication, ApproveItemApplication } from '../../actions/SUaction';
import axios from 'axios';

class ItemApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        axios.post('/suhome', { datatype: 'ITEMAPP'}).then( (resp)=>{
            //console.log(resp.data);
            this.props.viewItemApplication(resp.data);
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    };

    rejectHandler = (uid) => {
        if(confirm("Are you sure to reject?")){
            this.props.DenyItemApplication(uid);

            delete this.state[uid];

            let newState = this.state;
            this.setState({...newState});
        }
    };

    approveHandler = (uid) => {
        if(confirm("Are you sure to approve?")){
            this.props.ApproveItemApplication(this.state[uid]);

            delete this.state[uid];

            let newState = this.state;
            this.setState({...newState});
        }
    };

    renderApplicationList = () => {
        const Itemkeys = Object.keys(this.state);
        let Itemlist = [];

        for(let i = 0; i < Itemkeys.length; i++){
            this.state[Itemkeys[i]].uid = Itemkeys[i];
            Itemlist.push(this.state[Itemkeys[i]]);
        }

        let jsxOUlist = Itemlist.map( (application) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={application.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>Item Application:</span>
                    <br />
                    {application.title}<br />
                </div>
                <div className='card-action'>
                    <button onClick={()=>this.approveHandler(application.uid)}>approve</button>
                    <button onClick={()=>this.rejectHandler(application.uid)}>reject</button>
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
        viewItemApplication: (application) => dispatch( viewItemApplication(application)),
        DenyItemApplication: (application) => dispatch( DenyItemApplication(application)),
        ApproveItemApplication: (application) => dispatch( ApproveItemApplication(application))
    };
};

export default connect(null, mapDispatchToProps)(ItemApplicationList);
