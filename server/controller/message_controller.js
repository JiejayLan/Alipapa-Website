exports.sendMessage= (MESSAGE_SYSTEM)=>{	
    return (req,res)=>{
            let data = req.body;
            let send_message = MESSAGE_SYSTEM.send;
            send_message(data,res);
    }
}

exports.checkReceiveMessage=  (MESSAGE_SYSTEM)=>{	
    return (req,res)=>{
            let username = req.body.username;
            console.log("username is",username);
            let check_message = MESSAGE_SYSTEM.checkReceiveMessage;
            check_message(username ,res);
    }
}


// module.exports = (MESSAGE_SYSTEM) => {
  
//     router.post('/users/:user_ID', require('./get_user.js')(connection));
//     router.post('/authenticate', require('./authenticate_user.js')(connection));
    
//     return router;
    
//   }
