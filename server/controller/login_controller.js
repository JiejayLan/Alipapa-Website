
module.exports=(firebase)=>{
    return(req,res)=>{
    // console.log("req body is",req.body);
    firebase.database.ref('/users').once('value').then((snapshot)=> {       
        let USERS = snapshot.val()
        let userID ="";
        for(let id in USERS){
          if(USERS[id]["username"]===req.body.username && USERS[id]["password"] === req.body.password){
            userID = id;
            break;
          }              
        }
        let {address ,phone_number,user_type,username}={...USERS[userID]};
        res.json({address ,phone_number,user_type,username,userID});
        // if(if_exist)
        //  this.props.startLogin({address ,phone_number,user_type,username,userID}); 
    })
    }

}