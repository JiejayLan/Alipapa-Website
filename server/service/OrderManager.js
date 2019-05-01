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
						buyer: <Object>,
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
						
						DATABASE
							.ref('users')
							.child(ORDER_INFO.seller)
							.once('value')
							.then((sellerSnapshot) => {
								
								const ITEM = itemSnapshot.val();
								const SELLER = sellerSnapshot.val()
								const ORDER_PATH = 'orders/' +
																		ORDER_INFO.itemID;
								const NEW_ORDER = {
									... ORDER_INFO,
									itemName: ITEM.name,
									sellerUsername: SELLER.username
								}
								
								DATABASE
									.ref(ORDER_PATH)
									.set(NEW_ORDER)
									.then((result) => {
										
										resolve();
										
									})
								
							})
						
					})
				
			})
			
		}
	}

	
}