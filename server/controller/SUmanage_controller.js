const express = require('express');

module.exports = ( data ) => {

    let firebase = data.firebase;

    return(req,res)=>{

        if( req.body.datatype === 'OU'){
            firebase.database.ref(`/users`).once('value').then((snapshot)=> {       
            let users = snapshot.val();

            res.json(users); 
            });
        }
        else if( req.body.datatype === 'OUAPP'){
            firebase.database.ref(`/user_application`).once('value').then((snapshot)=> {       
                let userApplications = snapshot.val();
      
                res.json(userApplications);
            });
        }
        else if( req.body.datatype === 'ITEMAPP' ){
            firebase.database.ref(`/item_application`).once('value').then((snapshot)=> {       
                let itemApplications = snapshot.val();
      
                res.json(itemApplications);
            });
        }
        else if( req.body.datatype === 'COMP' ){
            firebase.database.ref('/message').once('value').then(snapshot =>{
                let messages = snapshot.val();
                
                res.json(messages);
            });
        }
        else if( req.body.datatype === 'ITEMS' ){
            firebase.database.ref('total_items').once('value').then(snapshot => {
                let items = snapshot.val();

                res.json(items);
            })
        }
        else if( req.body.datatype === 'TAB' ){
            firebase.database.ref('superUser/taboo').once('value').then(snapshot => {
                let taboos = snapshot.val();

                res.json(taboos);
            })
        }
    }
}