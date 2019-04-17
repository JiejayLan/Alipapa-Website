

module.exports=(data)=>{
	
	let firebase = data.firebase;
	
    return(req,res)=>{
        console.log(req.body);
        firebase.database.ref('/message').push().set({...req.body},
            function(error){
                if (error) {
                    res.status(400);
                    res.json({"status":"error"})
                  } 
                else {
                    res.status(200);
                    res.json({"status":"success"})
                  }         
            }); 
        }
    
}