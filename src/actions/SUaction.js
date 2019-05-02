import {database} from '../firebase/firebase';
import { object } from 'prop-types';

export const viewUser = (users) => {
    return {
        type: 'VIEW_USER',
        users
    }
};

export const warnUser = (userid) =>{
    return (dispatch, getState) =>{
        let ref = database.ref(`users/${userid}`);
        
        ref.once('value', snapShot =>{
            let user = snapShot.val();
            let warns = user.warn_count;
            let suspend = false;
            
            warns += 1;
            if(warns >= 2){
                suspend = true;
            }

            if(suspend && user.status !== 'suspended'){
                ref.update({status: 'suspended'});
            }
            ref.update( {warn_count : warns} )
        })
    }
}

export const removeUser = (user) => {
    return (dispatch, getState) => {

        const key = user;

        database.ref('users').child(key).update({status: 'delete'});
    }
};

export const viewUserApplication = (applications) => {
    return {
        type: 'VIEW_USER_APP',
        applications
    }
};

export const ApproveUserApplication = (application={}) => {
    return (dispatch, getState) => {
        const key = application.uid;
        let {
            address = '',
            credit_card = '',
            password = '', 
            phone_number = '',
            username = '' 
        } = application;

        const newUser = {address, credit_card, grade:{}, password, phone_number, 
            rating: 0, status: 'normal', total_spending: 0, userID, user_type: 'OU', 
            username, warn_count: 0};

        database.ref('user_application').child(key).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });

        return database.ref('users').push(newUser).then((ref) => {
            console.log(ref);
            dispatch({
              type: 'APP_USER_APP',
              application: {
              userID: key,
              ...newUser
              }
            });
        });
    };
};

export const DenyUserApplication = (application) => {
    return (dispatch, getState) => {
        const key = application;

        database.ref('user_application').child(key).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });

    }
};

export const viewItemApplication = (itemAppli) => {
    return {
            type: 'VIEW_ITEM_APP',
            itemAppli
    }
}

export const ApproveItemApplication = (itemAppli) => {
    return (dispatch, getState) => {

        dispatch({
            type: 'APP_ITEM_APP',
            itemAppli
        })
    }
};

export const DenyItemApplication = (itemAppli) => {
    return (dispatch, getState) => {
        const key = itemAppli;

        database.ref('item_application').child(key).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
        
    }
};

export const removeItem = (itemuid) =>{
    return (dispatch, getState) => {

        database.ref('total_items').child(itemuid).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
        
    }
}

export const addUserToBl = (username) => {
    return (dispatch, getState) => {

        database.ref('superUser/user_blacklist').child(username).set(true);
    }
};

export const addItemToBl = (itemname) => {
    return (dispatch, getState) => {

        database.ref('superUser/item_blacklist').child(itemname).set(true);
    }
};


export const justifyComp = (compid) => {
    return (dispatch, getState) =>{
        database.ref('message').child(compid).update({status: 'justified'});

        database.ref('message').child(compid).once('value', snapShot=>{
            let comp = snapShot.val();
            let userID = comp.receiver;

            database.ref('user').child(userID).update({warn_count: warn_count+1});
        })
    }
};


export const removeComp = (compid) => {
    return (dispatch, getState) =>{
        database.ref('message').child(compid).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
    }
};

export const removeTBword = (word) => {
    return (dispatch, getState) =>{
        database.ref('superUser/taboo').once('value', snapShot=>{
            let words = snapShot.val();

           for(let i = 0; i < words.length; i++){
                if(words[i] === word){
                    database.ref(`superUser/taboo`).child(i).remove().then(function() {
                        console.log("Remove succeeded.")
                      })
                      .catch(function(error) {
                        console.log("Remove failed: " + error.message)
                      });
                    break;
                }
            }
        });
    }
};

export const addTBword = (word) => {
    return (dispatch, getState) =>{
        database.ref('superUser/taboo').once('value', snapShot =>{
            let words = snapShot.val();

            let newIndex = words.length;

            database.ref('superUser/taboo').child(newIndex).set(word);
        })
    }
};

export function checkUsername (userID) {
    return new Promise((resolve, reject) => {
        database.ref(`users/${userID}`)
            .once('value')
            .then((snapshot) => {
                let user = snapshot.val();
                resolve(user.username);
            })
    })
}

export const ApealApprove = (messageid) => {
    return (dispatch, getState) =>{
        database.ref(`message/${messageid}`).once('value', snapShot=> {
            let messa = snapShot.val();
            let userID = messa.sender;
            let useref = database.ref(`users/${userID}`);
            useref.update({status: 'normal'});
            useref.update({warn_count: 0});
        }).then(snapShot=>{
            database.ref(`message`).child(messageid).remove();
        });
        
    }
}