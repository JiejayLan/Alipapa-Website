;
const express = require('express');
const router = express.Router();
module.exports = (MESSAGE_SYSTEM) => {

    //send out a message
    router.post('/send', async (req, res) => {
        let data = req.body;
        let send_message = MESSAGE_SYSTEM.send;
        let result = await send_message(data);
        if (result.status === "success") {
            res
                .status(204)
                .json({ status: result.message });
            res.end();
        }
        else {
            res
                .status(200)
                .json({ status: result.message });
            res.end();
        }
    });

    //check all receive message
    router.post('/checkReceive', (req, res) => {
        let username = req.body.userID;
        // console.log("username is",username);
        let check_message = MESSAGE_SYSTEM.checkReceiveMessage;
        check_message(username, res);
    }
    );

    //check all receive complain
    router.post('/checkComplain', (req, res) => {
        let username = req.body.userID;
        // console.log("username for complain",username);
        let check_message = MESSAGE_SYSTEM.checkReceiveComplain;
        check_message(username, res);
    }
    );

    return router;
}


