
module.exports = (firebase) => {
    //database instance
    let DATABASE= firebase.database;

	const MESSAGE_SYSTEM = {		
		//send out a message
		send: (data, res) => {            
                DATABASE.ref('/message').push().set({...data},
                    function(error){
                        if (error) {
                            res
                            .status(204)
                            .json({"status":"error", "message":error});
                            res.end();
                          } 
                        else {
                            res
                            .status(200)
                            .json({"status":"success", "postMessage":data});
                            res.end();
                        }         
                });    
        },

        //	check messages
		checkReceiveMessage: (username ,res) => {            
            DATABASE.ref('/message')
                .orderByChild("receiver")
                .equalTo(username)
                .on('value', (snapshot)=>{
                    // console.log("snapshot",snapshot.val());  
                    let message = snapshot.val();
                    if(message === undefined){
                        res
                        .status(204)
                        .json(message);
                        res.end();
                    }
                    else{
                        res
                        .status(200)
                        .json(message);
                        res.end();             
                    }                       
                });
        },
        //	check received complain messages
		checkReceiveComplain: (username ,res) => {            
            DATABASE.ref('/message')
                .orderByChild("complaintedUsername")
                .equalTo(username)
                .on('value', (snapshot)=>{
                    let message = snapshot.val();
                    if(message === undefined){
                        res
                        .status(204)
                        .json(message);
                        res.end();
                    }
                    else{
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
