;

module.exports = (data) => {
	
	const DATABASE = data.firebase.database;
	
	return {
		/*
			DESCRIPTION:
				Creates a pending order
				
			PARAMETERS:
				config = {
				data: {
						buyer: <String> representing userID of buyer,
						itemID: <String>,
						price: float,
						seller: <String> representing userID of seller,
						status: "pending" | "approved" | "precheckout" | "completed"
					}
				}
			
			RETURN VALUE:
				None if the pending order is successfully created
		*/
		createPendingOrder: (config) => {
			
			return new Promise ((resolve, reject) => {
				
				const ORDER_INFO = config.data;			
				
				DATABASE
					.ref('total_items')
					.child(ORDER_INFO.itemID)
					.once('value')
					.then((itemSnapshot) => {
						
						const ITEM = itemSnapshot.val();
						const ORDER_PATH = 'orders/' +
																ORDER_INFO.itemID;
						const NEW_ORDER = {
							... ORDER_INFO,
							itemName: ITEM.name
						}
						
						DATABASE
							.ref(ORDER_PATH)
							.set(NEW_ORDER)
							.then((result) => {
								
								resolve();
								
							})
						
					})
				
			})
			
		},
		
		/*
			DESCRIPTION:
				Converts a pending order to an approved order
				
			PARAMETERS:
				config = {
					id: <String> ID of order,
				}
			
			RETURN VALUE:
				Promise resolves if the approved order is created
		*/
		createApprovedOrder: (config) => {
			
			const ORDER_ID = config.id;
			
			return new Promise((resolve, reject) => {
				
				DATABASE
					.ref('orders')
					.child(ORDER_ID)
					.once('value')
					.then((snapshot) => {
						
						const PENDING_ORDER = snapshot.val();
						
						if (PENDING_ORDER === null) {
					
							reject(new Error("COULD NOT FIND ORDER"));
							return;
							
						} else {
						
							const APPROVED_ORDER = {
								... PENDING_ORDER,
								status: 'approved'
							}
							
							DATABASE
								.ref('orders')
								.child(ORDER_ID)
								.set(APPROVED_ORDER)
								.then((response) => {
									
									resolve();
									
								})
						}
						
					})											
				
			})
			
		},
		
		/*
			DESCRIPTION:
				
				
			PARAMETERS:
				config = {
					
				}
			
			RETURN VALUE:
				
		*/
		update: (config) => {
			

		}
		
	}

	
}