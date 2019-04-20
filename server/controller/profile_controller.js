module.exports=(data)=>{
	
  let firebase = data.firebase;

  return(req,res)=>{
    firebase.database.ref(`/users`).once('value').then((snapshot)=> {       
      let USERS = snapshot.val()
      let userID ="";
      for(let id in USERS){
        if(USERS[id]["username"]===req.body.username && USERS[id]["password"] === req.body.password){
          userID = id;
          break;
        }              
      }

      let {address, phone_number, username, password, credit_card}={...USERS[userID]};
      res.json({address, phone_number, username, password, credit_card}); 
  })
  }
}