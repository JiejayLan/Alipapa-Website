
module.exports = (firebase) => {
    //database instance
    let DATABASE = firebase.database;

    const MESSAGE_SYSTEM = {
        //send out a message
        send: (data) => {
            return new Promise((resolve, reject) => {
                (DATABASE.ref('/message').push().set({ ...data },
                    function (error) {
                        if (error){
                            console.log("error");
                            resolve({ "status": "error", "message": error });
                        } 
                        else{
                            console.log("no error");
                            resolve({ "status": "success", "message": data });
                        }
                            
                    }
                ))
            })
        },

        //	check messages
        checkReceiveMessage: (username, res) => {
            DATABASE.ref('/message')
                .orderByChild("receiver")
                .equalTo(username)
                .on('value', (snapshot) => {
                    // console.log("snapshot",snapshot.val());  
                    let message = snapshot.val();
                    if (message === undefined) {
                        res
                            .status(204)
                            .json(message);
                        res.end();
                    }
                    else {
                        res
                            .status(200)
                            .json(message);
                        res.end();
                    }
                });
        },
        //	check received complain messages
        checkReceiveComplain: (username, res) => {
            DATABASE.ref('/message')
                .orderByChild("complaintedUsername")
                .equalTo(username)
                .on('value', (snapshot) => {
                    let message = snapshot.val();
                    if (message === undefined) {
                        res
                            .status(204)
                            .json(message);
                        res.end();
                    }
                    else {
                        res
                            .status(200)
                            .json(message);
                        res.end();
                    }
                });
        }
    }

    return MESSAGE_SYSTEM;

}
