;

module.exports = (data) => {
	
	//	firebase.database() instance
	const DATABASE = data.firebase.database;
	
	const APPLICATIONS = {
		
		/*
			Description:
				Creates an item application for review by SU
				
			PARAMETERS:
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
				
			RETURN VALUE:
				Undefined if the application is successfully created
		
		*/
		create: (itemData) => {
			//	TODO
			//		Throw an error if the data is not valid
			const ITEM_TITLE = itemData.title;
			const KEYWORDS = itemData.keywords.reduce((prev, current) => {
				prev[current] = true
				return prev;
			}, {})
			const PRICE_TYPE = itemData.price_type;
			const PRICE = itemData.price;
			const CREATED = Date.now();
			
			
			let application = {
				title: ITEM_TITLE,
				keywords: KEYWORDS,
				price_type: PRICE_TYPE,
				price: PRICE,
				created: CREATED
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
		
		/*
			DESCRIPTION:
				Gets an application by its unique ID
				
			PARAMETERS:
				config = {
					id: <String>
				}
			
			RETURN VALUE:
				An object representing the application is returned.
				Null if the ID does not much any in the database.
		*/
		getOne: (config) => {
			
			const ID = config.id;
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('item_application')
					.child(ID)
					.once('value')
					.then((snapshot) => {
						
						resolve(snapshot.val());
						
					})
				
			})
			
		},
		
		//	retrieves all applications?
		getMultiple: (config) => {
			
			/*
			let applications = [];
			
			return new Promise((resolve, reject) => {
				
				DATABASE
				.ref('item_application')
				.orderByChild('created')
				.startAt(1555785135296)
				.on('child_added', (snapshot) => {
					
					applications.push(snapshot.val());
					if (applications.length === 2)
						resolve(applications)
					
				})
				
			})
			*/
			
		},
		
		
		//	accept / reject an application
		process: (config) => {
			
			
			
		}
		
	}


	const STORE = {
		
		/*
			DESCRIPTION:
				Retrieves an item from the store by its ID
				
			PARAMETERS:
				config = {
					id: <String> ID of item,
					sellerInfo: <boolean>
				}
			
			RETURN VALUE:
				If:
					(1) sellerInfo = false, returns an <Object> representing
							the item.
					(2) sellerInfo = true, returns <Result> where
							<Result> = {
								item: <Object> representing item,
								seller: <Object> representing seller
							}
		*/
		getOne: (config) => {
			
			const ITEM_ID = config.id;
			const GET_SELLER_INFO = config.sellerInfo;
			
			return new Promise((resolve, reject) => {

				DATABASE
					.ref('total_items')
					.child(ITEM_ID)
					.once('value')
					.then((snapshot) => {
						
						let item = snapshot.val();
						if (item === null || !GET_SELLER_INFO)
							resolve(item);
						
						const SELLER_ID = item.seller;
						
						DATABASE
							.ref('users')
							.child(SELLER_ID)
							.once('value')
							.then((snapshot) => {
								
								let seller = snapshot.val();
								
								resolve({
									item: item,
									seller: seller
								})
								
							})
						
						
					})

			})				
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
		
		/*
			DESCRIPTION:
				Updates an item in the store.
				
			PARAMETERS:
				config = {
					id: <String> ID of item,
					item: <Object> new value of item
				}
			
			RETURN VALUE:
				Returns the updated item
		*/
		update: (config) => {
			
			const ITEM_ID = config.id;
			const UPDATED_ITEM = config.item;
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('total_items')
					.child(ITEM_ID)
					.set(UPDATED_ITEM)
					.then((result) => {
						
						resolve(UPDATED_ITEM);
						
					})
				
			})
			
			
			
		},
		
		/*
			DESCRIPTION:
				Adds a new items to the store
				
			PARAMETERS:
				config = {
					data: <Object> item to be added
				}
			
			RETURN VALUE:
				None if successfully added
		*/
		create: (config) => {
			
			const ITEM = config.data;
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('total_items')
					.push(ITEM)
					.then((itemRef) => {
						
						resolve()
						
					})
				
			})
			
		},
		
		/*
			DESCRIPTION:
				Removes an item from the store by its ID
				
			PARAMETERS:
				config = {
					id: <String> ID of item
				}
			
			RETURN VALUE:
				None
		*/
		remove: (config) => {
			
			const ITEM_ID = config.id;
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('total_items')
					.child(ITEM_ID)
					.set(null)
					.then((result) => {
						
						resolve();
						
					})
				
			})
			
		},
		
		/*
			DESCRIPTION:
				Get ranged price items with status set to "good"
				
			PARAMETERS:
			
			RETURN VALUE:
				An array of <Object> of the form:
				{
					id: <String> unique ID of item,
					data: <Object> object representing the item
				}
				
		*/
		getRangedPriceItems: () => {
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('total_items')
					.orderByChild('price_type')
					.equalTo('ranged')
					.once('value')
					.then((snapshot) => {
						
						let values = [];
						snapshot.forEach((childSnapshot) => {
							
							if (childSnapshot.val().status === 'good') {
								
								values.push({
									id: childSnapshot.key,
									data: childSnapshot.val()
								})
								
							}
							
						})
						
						resolve(values);
						
					})
				
			})
			
			
		}
		
	}


	const ITEM_MANAGER = {
		
		applications: APPLICATIONS,
		store: STORE
		
	}
	
	return ITEM_MANAGER;
	
}
