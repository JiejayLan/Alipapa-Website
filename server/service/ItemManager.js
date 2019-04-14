;

module.exports = (data) => {
	
	//	firebase.database() instance
	const DATABASE = data.firebase.database;
	
	const APPLICATIONS = {
		
		//	creates an application
		create: (config) => {
			
		},
		
		//	retrieves a single application
		getOne: (config) => {
			
			
		},
		
		//	retrieves all applications?
		getAll: (config) => {
			
			
		},
		
		
		//	accept / reject an application
		process: (config) => {
			
			
			
		}
		
	}


	const STORE = {
		
		//	retrieves a single item from the store
		getOne: (config) => {
			//	config = { id: <ID of item> }
			
			const ITEM_ID = config.id;
			
			const ITEM = DATABASE
										.ref('total_items')
										.child(ITEM_ID)
										.once('value')
										.then((snapshot) => {
											
											let item = snapshot.val();
											
											return item;
											
										})
			
			return ITEM;
			
		},
		
		//	adds an item to the store
		create: (config) => {
			
			
		},
		
		//	removes an item from the store
		remove: (config) => {
			
			
		}
		
		
	}


	const ITEM_MANAGER = {
		
		applications: APPLICATIONS,
		store: STORE
		
	}
	
	return ITEM_MANAGER;
	
}
