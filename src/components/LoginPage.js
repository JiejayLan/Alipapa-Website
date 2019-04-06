import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import uuid from "uuid";
import axios from 'axios';
import {database,storage} from '../firebase/firebase';


class LoginPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        "username":"jie lan",
        "password":"hfh"
      };
    }

    handleSubmit= ()=> {  
      // axios.post('/login', {
      //   "username":"jie lan",
      //   "password":"hfh"
      // })
      // .then(function (response) {
      //   if(response.userID !="")
      //     this.props.startLogin(response); 
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      database.ref('/users').once('value').then((snapshot)=> {       
          let USERS = snapshot.val()
          let if_exist = false;
          let userID ="";
          for(let id in USERS){
            if(USERS[id]["username"]===this.state.username && USERS[id]["password"] === this.state.password){
              if_exist = true;
              userID = id;
              break;
            }              
          }
          let {address ,phone_number,user_type,username}={...USERS[userID]};
          if(if_exist)
           this.props.startLogin({address ,phone_number,user_type,username,userID}); 
      });
 
    }
  
    render() {
      return (
        <div className="box-layout">
          <div className="box-layout__box">

            <label>
              UserName:
              <input type="text" name={"username"} onChange={()=>{
                  this.setState({ "username": event.target.value });
              }}  
            />
            </label>

            <label>
              password:
              <input type="text" name={"password"} onChange={()=>{
                  this.setState({ "password": event.target.value });
              }}  
            />
            </label>

            <div>
                <button type="button" onClick={()=>this.handleSubmit()} >submit</button>
            </div>
            
          </div>
      </div>
      );
    }
    
  }


const mapDispatchToProps = (dispatch) => ({
  startLogin: (userData) => dispatch(login(userData))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
