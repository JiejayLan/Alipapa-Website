import React from 'react';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';

class SUhomePage extends React.Component {
  constructor(){
    super();
    this.state = {
        OUinfo : [

        ],
        OUapplication : [

        ],
        itemApplication :[

        ],
        searchkey : ''
    };
  }

  componentDidMount() {

    let rootRef = firebase.database().ref("users");
    let rootRef2 = firebase.database().ref("usersApplication");
    
      rootRef.on("value", snapshot => {

        // Store all the itemIDs in array
        let users = snapshot.val();

        // Store array into state
        let addinstate = {...this.state.OUinfo};
        addinstate = {...users};
        this.setState({OUinfo:addinstate});
        
        //checking 
        //console.log(this.state);
    });
    
      rootRef2.on("value", snapshot => {

        // Store all the itemIDs in array
        let userApp = snapshot.val();

        // Store array into state
        let addinstate = {...this.state.OUapplication};
        addinstate = {...userApp};
        this.setState({OUapplication:addinstate});
        
        //checking 
        console.log(this.state);
    });
  }
  
    render() {

      //Center style
      const divstyle ={
        margin: 'auto',
        padding: '5px',
        border: '5px',
        textAlign: 'center'
      }
      
      //get our user info out, and and make them into a JSX array
      let OUkeys = Object.keys(this.state.OUinfo);
      let OUlist = [];

      for(let i = 0; i < OUkeys.length; i++){
        OUlist.push(this.state.OUinfo[OUkeys[i]]);
      }

      let jsxOUlist = OUlist.map( (user) =>
        <div>
          <ol>{user.username}
          </ol>
          <button>warn</button>
          <button>remove</button>
        </div>
      );

      //get our user application info out, and and make them into a JSX array
      let OUAppkeys = Object.keys(this.state.OUapplication);
      let OUApplist = [];

      for(let i = 0; i < OUAppkeys.length; i++){
        OUApplist.push(this.state.OUapplication[OUAppkeys[i]]);
      }

      let jsxOUApplist = OUApplist.map( (userappli) =>
        <div>
          <ol>{userappli.name}
          </ol>
          <button>Approve</button>
          <button>Bye</button>
        </div>
      );


    return (
      <div style={divstyle}>
        <h1 className="text-center">Welcome back Super User</h1>
        <br />
        <hr />
        <h2 className="text-center">User Information</h2>
        <div>{jsxOUlist}</div>
        <br />
        <hr />
        <h2 className="text-center">New User Application</h2>
        <div>{jsxOUApplist}</div>
        <br />
        <hr />
        <h2 className="text-center">New Item Application</h2>
      </div>
    )
  }
}

export default SUhomePage;