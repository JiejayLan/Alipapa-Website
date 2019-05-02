import React from 'react';
import { connect } from 'react-redux';
import * as firebase from "firebase";
import {database,storage} from '../firebase/firebase';
import UserList from '../components/SUhomePage/UserList';
import UserApplicationList from '../components/SUhomePage/UserApplicationList';
import ItemApplicationList from '../components/SUhomePage/ItemApplicationList';
import ComplaintList from '../components/SUhomePage/ComplaintList';
import SUviewItems from '../components/SUhomePage/SUviewItems';
import TabooList from '../components/SUhomePage/TabooList';
import axios from 'axios';


class SUhomePage extends React.Component {
  constructor(){
    super();
    this.state = {

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
        <ItemApplicationList />
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className='text-center'>Items in System</h2>
        <SUviewItems />
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className='text-center'>Complaint</h2>
        <ComplaintList />
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className='text-center'>Appeal</h2>
        <br />
        <div className='clearfix'></div>
        <hr />
        <h2 className='text-center'>Taboo List</h2>
        <TabooList />
        <br />
        <div className='clearfix'></div>
      </div>
    )
  }
}


export default connect() (SUhomePage);