import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewUser } from '../../actions/SUaction';
import axios from 'axios';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        axios.post('/suhome', { datatype: 'OU'}).then( (resp)=>{
            //console.log(resp.data);
            this.props.viewUser(resp.data);
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    }

    renderUserList = () => {
        const OUkeys = Object.keys(this.state);
        let OUlist = [];

        for(let i = 0; i < OUkeys.length; i++){
            if( !this.state[OUkeys[i]].user_type ){
                this.state[OUkeys[i]].user_type = 'New User'
            };
            OUlist.push(this.state[OUkeys[i]]);
        }

        let jsxOUlist = OUlist.map( (user) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={user.username}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>{user.user_type}</span>
                    <p>{user.username}</p>
                    <p>{user.status}</p>
                </div>
                <div className='card-action'>
                    <button>warn</button>
                    <button>remove</button>
                </div>
            </div>
            </div>
        );

        return jsxOUlist;
    };


    render(){

        let resultList = this.renderUserList();

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
        viewUser: (user) => dispatch( viewUser(user))
    };
};

export default connect(null, mapDispatchToProps)(UserList);
