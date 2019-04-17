import {firebase, googleAuthProvider} from '../firebase/firebase';


export const login = (
    {
      address = "",
      phone_number = "",
      user_type = "", 
      userID="",
      status=""
    } = {}
  ) => {
    return ({
      type: 'LOGIN',
      userData:{
      address,
      phone_number,
      user_type,
      userID,
      status
    }
  })};


export const logout = () => ({
  type: 'LOGOUT'
});


export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};