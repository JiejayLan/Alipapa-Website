import React from 'react'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import { viewUser, removeUser, warnUser } from '../../actions/SUaction';
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

    inspectUser = (uid) => {
        let name = this.state[uid].username;
        let warns = this.state[uid].warn_count;
        let rating = this.state[uid].rating;
        if(rating === 0){
            confirm(name +' has ' + warns + ' warning(s) and has no rating yet');
        }
        else{
            let grade = this.state[uid].grade;

            confirm(name +' has ' + warns + ' warning(s), the rating is '+ rating+ 'and is conducted by '+grade);
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
            return <Redirect to='/sendMessage' />
        };
    }


    renderUserList = () => {
        const OUkeys = Object.keys(this.state);
        let OUlist = [];

        for(let i = 0; i < OUkeys.length; i++){

            if( this.state[OUkeys[i]].user_type === 'SU' ){
                continue;
            };

            if( this.state[OUkeys[i]].status === 'delete'){
                continue;
            }
            /*Every code from here is just to prevent issue sice the format of user in DB is not finalized yet */
            if( this.state[OUkeys[i]].username === 'shibin' ){
                continue;
            };
            if( !this.state[OUkeys[i]].grade ){
                this.state[OUkeys[i]].grade = {}
            };
            if( !this.state[OUkeys[i]].rating ){
                this.state[OUkeys[i]].rating = 0;
            };
            /************ */

            this.state[OUkeys[i]].uid = OUkeys[i];

            OUlist.push(this.state[OUkeys[i]]);
        }

        let jsxOUlist = OUlist.map( (user) =>
            <div className='col-9 mx-auto col-md-6 col-lg-3 my-3 rounded float-left' key={user.uid}>
            <div className='card'>
                <div className='card-content'>
                    <span className='card-title'>{user.username}</span>
                    <br />{user.user_type}<br />
                    address: {user.address}<br />
                    phone: {user.phone_number}<br />
                    rating: {user.rating}<br />
                    warning: {user.warn_count}<br />

                    {user.status}
                </div>
                <div className='card-action'>
                    <button onClick={()=>this.inspectUser(user.uid)}>inspect</button>
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
        removeUser: (user) => dispatch( removeUser(user)),
        warnUser: (user) => dispatch( warnUser(user) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
