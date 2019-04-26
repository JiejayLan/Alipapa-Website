import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewUser, removeUser } from '../../actions/SUaction';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.redirect = false;

        axios.post('/suhome', { datatype: 'OU'}).then( (resp)=>{
            //console.log(resp.data);
            this.props.viewUser(resp.data);
            
            this.setState({...resp.data});

        }).catch( err =>{
            console.log(err);
        });
    };

    removeUserHandler = (uid) => {
        if (confirm("Are you sure to remove this user?")){
            if(confirm('There is no turning back, please review detail on this user carefully, still want to remove?')){
                this.props.removeUser(uid);

                delete this.state[uid];

                let newState = this.state;
                this.setState({...newState});
            }
        }
    }

    setRedirect = () => {
        if(confirm('Are you sure to warn this user. This will redirect you to the message system! Please remember the username!')){
            this.redirect = true;
            this.setState({...this.state});
        }
    }

    warnRedirect = () => {
        if(this.redirect){
            return <Redirect to='/message' />
        };
    }

    renderUserList = () => {
        const OUkeys = Object.keys(this.state);
        let OUlist = [];

        for(let i = 0; i < OUkeys.length; i++){
            
            this.state[OUkeys[i]].uid = OUkeys[i];

            if( !this.state[OUkeys[i]].user_type ){
                this.state[OUkeys[i]].user_type = 'New User'
            };

            OUlist.push(this.state[OUkeys[i]]);
        }

        let jsxOUlist = OUlist.map( (user) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={user.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>{user.user_type}</span>
                    <p>{user.username}</p>
                    <p>{user.status}</p>
                </div>
                <div className='card-action'>
                    <button onClick={this.setRedirect}>warn</button>
                    <button onClick={()=>this.removeUserHandler(user.uid)}>remove</button>
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
                {this.warnRedirect()}
                {resultList}
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    //user: state.auth
});

const mapDispatchToProps = (dispatch) => {
    return {
        viewUser: (user) => dispatch( viewUser(user)),
        removeUser: (user) => dispatch( removeUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
