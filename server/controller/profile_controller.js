module.exports=(data)=>{
	
  let firebase = data.firebase;
  return(req,res)=>{
    firebase.database.ref(`/users`).once('value').then((snapshot)=> {       
      let USERS = snapshot.val();
      let userID ="test";
      for(let id in USERS){
        if(USERS[id]===req.body.userID){
          userID = id;
          break;
        }              
      }
      console.log(userID);
      let {address, phone_number, username, password, credit_card}={...USERS[userID]};
      res.json({address, phone_number, username, password, credit_card}); 
  })
  }
}