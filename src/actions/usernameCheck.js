import {database} from '../firebase/firebase';

export const usernameUniqueCheck = (username) => {
  return database.ref('users').once('value').then((snapshot) => {
    const USERS = [];

    snapshot.forEach(childSnapshot => {
      USERS.push(childSnapshot.val().username);
    });

    console.log(USERS);
    
    const INDEX = USERS.findIndex((element) => {
      return element === username;
    });

    return INDEX;
  });
}

//        if index === -1, username does not exist in TABOOS
//        else it exists in TABOOS
export const usernameTabooCheck = (username) => {
  return database.ref('superUser/taboo').once('value').then((snapshot) => {
    const TABOOS = [];

    snapshot.forEach(childSnapshot => {
      TABOOS.push(childSnapshot.val());
    });
    
    const INDEX = TABOOS.findIndex((element) => {
      return element === username;
    });

    return INDEX;
  });
}

export const usernameBlacklistCheck = (username) => {
  return database.ref('superUser/user_blacklist').once('value').then((snapshot) => {
    const BLACKLIST = [];

    snapshot.forEach(childSnapshot => {
      BLACKLIST.push(childSnapshot.key);
    });

    const INDEX = BLACKLIST.findIndex((element) => {
      return element === username;
    });

    return INDEX;
  });
}