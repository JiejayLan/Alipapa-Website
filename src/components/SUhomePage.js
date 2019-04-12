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
    
      rootRef.on("value", snapshot => {

        // Store all the itemIDs in array
        let users = [];
        snapshot.forEach(function(snap){
            let row = snap.val();
            users.push(row);
        });

        // Store array into state
        let addinstate = [...this.state.OUinfo];
        addinstate.push(users);
        this.setState({OUinfo:addinstate});
        
        //checking 
        console.log(this.state);
    });

    let rootRef2 = firebase.database().ref("user_application");
    
      rootRef2.on("child_added", snapshot => {

        // Store all the itemIDs in array
        let userApp = [];
        snapshot.forEach(function(snap){
            let row = snap.val();
            userApp.push(row);
        });

        // Store array into state
        let addinstate = [...this.state.OUapplication];
        addinstate.push(userApp);
        this.setState({OUinfo:addinstate});
        
        //checking 
        console.log(this.state);
    });
  }
  
    render() {
    return (
      <div>
        <h1 className="text-center">Welcome back Super User</h1>
        <h2 className="text-center">User Information</h2>
        <h2 className="text-center">New User Application</h2>
        <h2 className="text-center">New Item Application</h2>
      </div>
    )
  }
}

export default SUhomePage;