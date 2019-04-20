import {firebase, googleAuthProvider} from '../firebase/firebase';
import axios from 'axios';

export const login = (
    {
      address = "",
      phone_number = "",
      user_type = "", 
      userID="",
      status="",
      username=""
    } = {}
  ) => {
    return ({
      type: 'LOGIN',
      userData:{
      address,
      phone_number,
      user_type,
      userID,
      status,
      username
    }
  })};


export const logout = ({userID,status}={}) => {
  let isDelete =  status == "delete";
  if(status == "delete"){
    axios.post('/delete', {
      userID:userID
    })
    .then( (response)=> {
      console.log("delete successfully");
      return({type: 'LOGOUT'});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return({type: 'LOGOUT'})
}
  


export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};