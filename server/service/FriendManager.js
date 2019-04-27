;

module.exports = (firebase) => {
	
	//	firebase.database() instance
	const DATABASE = firebase.database;
	
	const FRIEND_MANAGER= {

		//add a new friend
		addFriend: (config) => {
			const USER_NAME = config.userName;
			const FRIEND_NAME = config.friendName;
			return new Promise((resolve, reject) => {
				DATABASE
				.ref('friends/'+USER_NAME)
				.child(FRIEND_NAME)
				.set(true,(dataRef) => {		
					resolve({"status":"success"})				
				})
				
			})				

		},
		
		//delete a friend of a specific user
		deleteFriend: (config) => {
			
			const USER_NAME = config.userName;
			const FRIEND_NAME = config.friendName;
			
			return new Promise((resolve, reject) => {
				DATABASE
				.ref('friends/'+USER_NAME)
				.child(FRIEND_NAME)
				.set(null,(dataRef) => {	
					resolve({"status":"success"})			
	
				})					
			})								
		},			
		
		//List of friends of a specific user
		listFriend: (config) => {

			const USER_NAME = config.userName;
			const FRIEND_NAME = config.friendName;
			
			return( 
				DATABASE
					.ref('friends/'+USER_NAME)
					.once('value')
					.then((snapshot) => {				
						return snapshot.val();			
					}))					
			
		},

		//check if this is a friend
		checkFriend: (config) => {
			const USER_NAME = config.userName;
			const FRIEND_NAME = config.friendName;
			return( 
				DATABASE
					.ref('friends/'+USER_NAME+"/"+FRIEND_NAME)
					.once('value')
					.then((snapshot) => {			
						return snapshot.val();			
					}))					
			
		}
	}
		
	return FRIEND_MANAGER;
	
}
