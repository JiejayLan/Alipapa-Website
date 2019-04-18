;
const express = require('express');
const router = express.Router();
module.exports = (MESSAGE_SYSTEM) => {
    
    //send out a message
    router.post('/send', (req,res)=>{	
                let data = req.body;
                let send_message = MESSAGE_SYSTEM.send;
                send_message(data,res);
    });

    //check all receive message
    router.post('/checkReceive', (req,res)=>{	    
            let username = req.body.username;
            // console.log("username is",username);
            let check_message = MESSAGE_SYSTEM.checkReceiveMessage;
            check_message(username ,res);
        }
    );

    //check all receive complain
    router.post('/checkComplain', (req,res)=>{	    
        let username = req.body.username;
        // console.log("username for complain",username);
        let check_message = MESSAGE_SYSTEM.checkReceiveComplain;
        check_message(username ,res);
    }
    );
    
    return router;
}
    
  
