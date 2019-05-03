import {database} from '../firebase/firebase';

export const getUserProfile = (userID) => {
  return new Promise((resolve, reject) => 
    database.ref(`users/${userID}`).once('value', snapshot => 
      resolve( snapshot.val())
      )  
  ).then(result => {
    console.log(result);
    return result;
  });
}

// database.ref(`users/${userID}`).once('value').then((snapshot) => {
//   const USER = snapshot.val();
//   return USER;
// })