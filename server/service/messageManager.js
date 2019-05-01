

module.exports = (firebase) => {
    //database instance
    let DATABASE = firebase.database;

    //check and return userID based on username
    let checkID = (username) => {
        return new Promise((resolve, reject) => {
            DATABASE.ref('/users')
                .orderByChild('username')
                .equalTo(username)
                .on('value', (snapshot) => {
                    //no such user and return null
                    if (!snapshot.val())
                        resolve(null);
                    else {
                        let userID = Object.keys(snapshot.val())[0];
                        resolve(userID);
                    }
                })
        })
    }

    //check and return username based on userID
    let checkUsername = (userID) => {
        return new Promise((resolve, reject) => {
            DATABASE.ref('/users' + '/' + userID)
                .once('value')
                .then((snapshot) => {
                    let user = snapshot.val();
                    resolve(user.username);
                })
        })
    }

    const MESSAGE_SYSTEM = {
        /*send out a message
        data is an object, the key for diffenert message should be different
        1.regular message
            messageType:"message"
            description
            receiver
            sender
        2.warning(SU only)
            description
            messageType:"warning"
            receiver
            sender:"SU" 
        3.complain(OU only)
            description
            messageType:"complain"
            receiver:"SU"
            sender
            compainUser:(who you want to complain)
            status:"suspended" or "justified"
        4.explain(OU only)
            description
            messageType:"explain"
            receiver:"SU"
            sender
            explainUser:(who you want to explain)
        5.appeal(OU only)    
            description
            messageType:"appeal"
            receiver:"SU"
            sender         
        */

        //send out a message
        send: async (data) => {

            //replace all username with userID
            for (let key in data) {
                if (key === "sender" || key === "complaintUser" || key === "explainUser" || key === "receiver") {
                    let userID = await checkID(data[key]);
                    data[key] = userID;
                }
            }

            return new Promise((resolve, reject) => {
                (DATABASE.ref('/message').push().set({ ...data },
                    function (error) {
                        if (error) {
                            console.log("error");
                            resolve({ "status": "error", "message": error });
                        }
                        else {
                            console.log("no error");
                            resolve({ "status": "success", "message": data });
                        }
                    }
                ))
            })
        },

        //	check messages
        checkReceiveMessage: (userID, res) => {
            DATABASE.ref('/message')
                .orderByChild("receiver")
                .equalTo(userID)
                .on('value', async (snapshot) => {
                    let messages = snapshot.val();

                    //replace all userID with username
                    for (let key in messages) {
                        let message = messages[key]
                        let sender = await checkUsername(message.sender);
                        message.sender = sender;
                    }

                    if (messages === undefined) {
                        res
                            .status(204)
                            .json(messages);
                        res.end();
                    }
                    else {
                        res
                            .status(200)
                            .json(messages);
                        res.end();
                    }
                });
        },
        
        //	check received complain messages
        checkReceiveComplain: (userID, res) => {
            DATABASE.ref('/message')
                .orderByChild("complaintUser")
                .equalTo(userID)
                .on('value', async (snapshot) => {
                    let messages = snapshot.val();

                    //replace all userID with username
                    for (let key in messages) {
                        let message = messages[key]
                        let sender = await checkUsername(message.sender);
                        message.sender = sender;
                    }

                    if (messages === undefined) {
                        res
                            .status(204)
                            .json(messages);
                        res.end();
                    }
                    else {
                        res
                            .status(200)
                            .json(messages);
                        res.end();
                    }
                });
        }
    }

    return MESSAGE_SYSTEM;

}
