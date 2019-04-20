;

module.exports = (data) => {
	
	//	firebase.database() instance
	const DATABASE = data.firebase.database;
	
	const APPLICATIONS = {
		
		//	creates an application
		create: (itemData) => {
			
			/*
				PARAMETERS
					itemData = {
						title: <String>,
						keywords: [keywords]
						price_type: "fixed" | "ranged",
						price: 
							<Float> | 
							{
								min: <Float>,
								max: <Float>
							}
					}
				RETURN VALUE
					Undefined if the application is successfully created
			
			*/
			
			//	TODO
			//		Throw an error if the data is not valid
			const ITEM_TITLE = itemData.title;
			const KEYWORDS = itemData.keywords.reduce((prev, current) => {
				prev[current] = true
				return prev;
			}, {})
			const PRICE_TYPE = itemData.price_type;
			const PRICE = itemData.price;
			
			
			let application = {
				title: ITEM_TITLE,
				keywords: KEYWORDS,
				price_type: PRICE_TYPE,
				price: PRICE
			}
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('item_application')
					.push(application)
					.then( (dataRef) => {
						
						resolve();
						
					})
					
			})
			
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
