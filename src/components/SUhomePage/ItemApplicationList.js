import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewItemApplication } from '../../actions/SUaction';
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
    }

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
        viewItemApplication: (application) => dispatch( viewItemApplication(application))
    };
};

export default connect(null, mapDispatchToProps)(ItemApplicationList);
