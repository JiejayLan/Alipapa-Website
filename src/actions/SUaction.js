import {database} from '../firebase/firebase';
import { object } from 'prop-types';

export const viewUser = (users) => {
    return {
        type: 'VIEW_USER',
        users
    }
};

export const warnUser = (username) =>{
    return (dispatch, getState) =>{
        let ref = database.ref('users');
        
        ref.once('value', snapShot =>{
            let users = snapShot.val();
            let keys = Object.keys(users);
            let targetuid = '';
            let warns = 0;

            for( let i = 0; i < keys.length; i++){
                if( users[keys[i]].username === username ){
                    warns = users[keys[i]].warn_count;
                    warns += 1;
                    targetuid = keys[i]
                    break;
                }
            }

            ref.child(targetuid).update( {warn_count : warns} )

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
            rating: 0, status: 'normal', user_type: 'OU', username, warn_count: 0};

        database.ref('user_application').child(key).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });

        return database.ref('users').push(newUser).then((ref) => {
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
        
        /*dispatch({
            type: 'DENY_USER_APP',
            application
        })*/
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
