;
module.exports = (firebase) => {
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
					if (!snapshot.val())
						resolve(null);
					else {
						let user = snapshot.val();
						resolve(user.username);
					}
				})
		})
	}

	//	firebase.database() instance
	const DATABASE = firebase.database;

	const FRIEND_MANAGER = {

		//add a new frie
		addFriend: async (config) => {
			let userID = config.userID;
			let friendName = config.friendName;
			let friendID = await checkID(friendName);
			return new Promise((resolve, reject) => {
				if (!friendID)
					resolve({ "status": "fail" })
				DATABASE
					.ref('friends/' + userID)
					.child(friendID)
					.set(true, (dataRef) => {
						resolve({ "status": "success" })
					})

			})

		},

		//delete a friend of a specific user
		deleteFriend: async (config) => {

			let userID = config.userID;
			let friendName = config.friendName;
			let friendID = await checkID(friendName);

			return new Promise((resolve, reject) => {
				if (!friendID)
					resolve({ "status": "fail" })
				DATABASE
					.ref('friends/' + userID)
					.child(friendID)
					.set(null, (dataRef) => {
						resolve({ "status": "success" })

					})
			})
		},

		//List of friends of a specific user
		listFriend: async (config) => {

			let userID = config.userID;
			return (
				DATABASE
					.ref('friends/' + userID)
					.once('value')
					.then(async (snapshot) => {
						let friends = snapshot.val();
						for (let id in friends) {
							let name = await checkUsername(id);
							friends[id] = name;

						}
						return friends;
					}))

		},

		//check if this is a friend
		checkFriend: async (config) => {
			let userID = config.userID;
			let friendName = config.friendName;
			let friendID = config.friendID || await checkID(friendName);
			return (
				DATABASE
					.ref('friends/' + userID + "/" + friendID)
					.once('value')
					.then((snapshot) => {
						return snapshot.val();
					}))

		}
	}

	return FRIEND_MANAGER;
}
