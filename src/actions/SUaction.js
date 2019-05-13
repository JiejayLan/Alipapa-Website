import {database} from '../firebase/firebase';
import { object } from 'prop-types';

export const viewUser = (users) => {
    return {
        type: 'VIEW_USER',
        users
    }
};

export const warnUserbyID = (uid) => {
    return (dispatch, getState) =>{
        let ref = database.ref('users').child(uid);
        ref.once('value', snapShot=>{
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
            if(user.user_type === 'VIP OU'){
                ref.update({user_type: 'OU'});
            }
            ref.update( {warn_count : warns} )
        }) 
    }
}
export const warnUser = (username) =>{
    return (dispatch, getState) =>{

        database.ref('users').once('value', snapShot=>{
            let keys = Object.keys(snapShot.val());
            let alluser = snapShot.val();
            let userid;

            for(let i =0; i < keys.length; i++){
                if(username === alluser[keys[i]].username){
                    userid = alluser[keys[i]].userID
                }
            }

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
                if(user.user_type === 'VIP OU'){
                    ref.update({user_type: 'OU'});
                }
                ref.update( {warn_count : warns} )
            })
        });
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
            address_state ='',
            credit_card = '',
            phone_number = '',
            username = '' 
        } = application;

        let passw = username;

        let balance = 10 + Math.floor(Math.random() * 500);  

        const newUser = {address, address_state, balance: balance, credit_card, grade:{}, password: passw, phone_number, 
            rating: 0, status: 'normal', total_spending: 0, user_type: 'OU', 
            username, warn_count: 0};

        database.ref('user_application').child(key).remove().then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });

        let id = database.ref('users').push(newUser);
        let uid = id.key;
        database.ref('users').child(uid).update({userID: uid});
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

export const ApproveItemApplication = (application ={}) => {
    return (dispatch, getState) => {

        let id = application.uid;

        if(application.priceNature === 'Range_Price'){
            let {
                description = '',
                keywords =[],
                pictureURL ='',
                price = '',
                sellerID = '',
                title = '' 
            } = application;
        
            let hotness = 1 + Math.floor(Math.random() * 5);  
            
            let today = new Date();
            let endtime = today.setDate( today.getDate() + 3 );

            const newItem = { bidEnd: endtime, description, itemID:'', url: pictureURL, hotness: hotness, keywords, 
                price: {current: price, max: price, min: price, previous: price}, 
                price_type: 'ranged', seller: sellerID, status: 'good', title: title };

            let key = database.ref('total_items').push(newItem);
            let uid = key.key;
            database.ref('total_items').child(uid).update({itemID: uid});

            notfyKeyUser(keywords);
        }
        else if(application.priceNature === 'Fixed_Price'){
            let {
                description = '',
                keywords =[],
                pictureURL ='',
                price = '',
                sellerID = '',
                title = '' 
            } = application;
        
            let hotness = 1 + Math.floor(Math.random() * 5);  

            const newItem = { description, keywords, url: pictureURL, hotness: hotness,
                price: {current: price, max: price, min: price, previous: price}, 
                price_type: 'fixed', seller: sellerID, status: 'good', title: title };

            let key = database.ref('total_items').push(newItem);
            let uid = key.key;
            database.ref('total_items').child(uid).update({itemID: uid});

            notfyKeyUser(keywords);
        }
        database.ref('item_application').child(id).remove();

    }
};

export const notfyKeyUser = (keywords = {}) =>{
    if(keywords === null){
        return;
    }
    else{
        database.ref('keywords').once('value', snapShot=>{
            let keywordkey = Object.keys(keywords);

            let allkeyword = snapShot.val();
            let keys = Object.keys(allkeyword);
            
            for(let i = 0; i < keywordkey.length; i++){
                for(let j = 0; j < keys.length; j++){
                    
                    if(keys[j] === keywordkey[i]){
                        
                        let users = Object.keys(allkeyword[keys[j]]);
                        
                        for(let k = 0; k < users.length; k++){
                            let newMessage = {
                                description: `A item with the keyword that you are looking for (${keys[j]}) has been put on sale, go check it out!`,
                                messageType: 'message',
                                receiver: users[k],
                                sender: 'userID3'
                            };
                            database.ref('message').push(newMessage);
                        };
                    };
                };
            };
        });
    };
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
        if(itemname.length > 30){
            itemname = itemname.slice(0,29);
        }
        database.ref('superUser/item_blacklist').child(itemname).set(true);
    }
};


export const justifyComp = (compid) => {
    return (dispatch, getState) =>{
        database.ref('message').child(compid).update({status: 'justified'});

        database.ref('message').child(compid).once('value', snapShot=>{
            let comp = snapShot.val();
            let userID = comp.receiver;

            database.ref('user').child(userID).update({warn_count: warn_count+0.5});
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