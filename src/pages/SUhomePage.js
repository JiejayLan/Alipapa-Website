import React from 'react';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';
import UserList from '../components/SUhomePage/UserList';
import UserApplicationList from '../components/SUhomePage/UserApplicationList';
import axios from 'axios';
import { viewUser, removeUser, 
  viewUserApplication, ApproveUserApplication, DenyUserApplication,
  viewItemApplication, ApproveItemApplication, DenyItemApplication}
  from '../actions/SUaction';


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
  
    render() {

      //Center style
      const divstyle ={
        margin: 'auto',
        padding: '5px',
        border: '5px',
        textAlign: 'center'
      }

    return (
      <div style={divstyle}>
        <h1 className="text-center">Welcome back Super User</h1>
        <br />
        <hr />
        <h2 className="text-center">User Information</h2>
        <UserList />
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className="text-center">New User Application</h2>
        <UserApplicationList />
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className="text-center">New Item Application</h2>
      </div>
    )
  }
}

/*const mapStateToProps = (state) => {
  return {
    projects: state.SUviewData.projects
  }
};*/

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (user) => dispatch( removeUser(user)),

    ApproveUserApplication: (application) => dispatch(
      ApproveUserApplication(application)
    ),
    DenyUserApplication: (application) => dispatch(
      DenyUserApplication(application)
    )
  }
}

export default connect(null, mapDispatchToProps) (SUhomePage);