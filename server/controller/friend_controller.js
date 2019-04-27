;
const express = require('express');
const router = express.Router();
module.exports = (FRIEND_MANAGE) => {

    //add a new friend
    router.post('/addfriend', async (req, res) => {
        let data = req.body;       
        const ADD_FRIEND = FRIEND_MANAGE.addFriend;
        let result = await ADD_FRIEND(data);
        if (result.status === "success") {
            console.log("add friend success");
            res
                .status(204)
                .json({ status: result.message });
        }
        else {
            console.log("add friend fail");
            res
                .status(200)
                .json({ status: result.message });
        }
    });

    //delete a friend
    router.post('/deletefriend', async (req, res) => {
        let data = req.body;       
        const DELETE_FRIEND = FRIEND_MANAGE.deleteFriend;
        let result = await DELETE_FRIEND(data);
        if (result.status === "success") {
            console.log("delete friend success");
            res
                .status(204)
                .json({ status: result.message });
        }
        else {
            console.log("delete friend fail");
            res
                .status(200)
                .json({ status: result.message });
        }
    });



    router.post('/listfriend', async (req, res) => {
        let data = req.body; 
        const LIST_FRIEND = FRIEND_MANAGE.listFriend;
        LIST_FRIEND(data).then((result)=>{
            console.log("result is",result);
            if (result !== {}) {
                console.log("list friend success");
                res
                    .status(200)
                    .json(result);
            }
            else {
                console.log("list friend fail");
                res
                    .status(204)
                    .json({ friendList:null });
            }

        });

    });

    router.post('/checkfriend', async (req, res) => {
        let data = req.body; 
        const CHECK_FRIEND = FRIEND_MANAGE.checkFriend;
        CHECK_FRIEND(data).then((result)=>{
            console.log("result is",result);
            if (result) {
                res
                    .status(200)
                    .json(result);
            }
            else {
                console.log("list friend fail");
                res
                    .status(204)
                    .json({ friendList:null });
            }

        });

    });


    return router;
}


