

module.exports.login=(data)=>{
		let firebase = data.firebase;
	
    return(req,res)=>{
      firebase.database.ref('/users').once('value').then((snapshot)=> {       
          let USERS = snapshot.val()
          let userID ="";
          for(let id in USERS){
            if(USERS[id]["username"]===req.body.username && USERS[id]["password"] === req.body.password){
              userID = id;
              break;
            }              
          }
          let {address ,phone_number,user_type,username,status}={...USERS[userID]};
          res.json({address ,phone_number,user_type,username,userID,status}); 
      })
    }
}


module.exports.delete=(data)=>{
  let firebase = data.firebase;

  return(req,res)=>{
    let userID = req.body.userID;
    firebase.database.ref('/users/'+userID).set(null,function(error){
      if(error){
        res
           .status(204)
           .json(error)
      }
      else{
        res
           .status(200)
           .json({"status":"success"})       
      }

    });
  }
}