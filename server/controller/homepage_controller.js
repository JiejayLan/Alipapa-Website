const express = require('express');

module.exports = ( data ) => {

    let firebase = data.firebase;

    return(req,res)=>{
        firebase.database.ref('total_items').once('value').then(snapshot => {
            let items = snapshot.val();

            res.json(items);
        });
    }
}