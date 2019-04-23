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
    }
}