;

module.exports = (firebase) => {
	
	//	firebase.database() instance
	const DATABASE = firebase.database;
	
	const FRIEND_MANAGER= {

		//add a new friend
		addFriend: (config) => {
			const USER_ID = config.id;
			const FRIEND_ID = config.friend_id;
			return new Promise((resolve, reject) => {
				DATABASE
				.ref('friends/userID1')
				.child('userID3')
				.set(null,(dataRef) => {		
					resolve({"status":"success"})				
				})
				
			})				

		},
		
		//delete a friend of a specific user
		deleteFriend: (config) => {
			
			const USER_ID = config.id;
			const FRIEND_ID = config.friend_id;
			
			return new Promise((resolve, reject) => {
				DATABASE
				.ref('friends/userID1')
				.child('userID3')
				.set(null,(dataRef) => {	
					resolve({"status":"success"})			
	
				})					
			})								
		},
		
		//List of friends of a specific user
		listFriend: (config) => {

			const USER_ID = config.userID;
			
			return( 
				DATABASE
					.ref('friends/'+USER_ID)
					.once('value')
					.then((snapshot) => {				
						return snapshot.val();			
					}))					
			
		},

		//check if this is a friend
		checkFriend: (config) => {
			console.log(config);
			const USER_ID = config.userID;
			const FRIEND_ID = config.friendID;
			return( 
				DATABASE
					.ref('friends/'+USER_ID+"/"+FRIEND_ID)
					.once('value')
					.then((snapshot) => {	
						console.log(USER_ID,FRIEND_ID,snapshot.val());			
						return snapshot.val();			
					}))					
			
		}
	}
		
	return FRIEND_MANAGER;
	
}
