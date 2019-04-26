;

module.exports = (data) => {
	
	const DATABASE = data.firebase.database;
	
	
	const PENDING = {
		/*
			DESCRIPTION:
				Creates a pending order
				
			PARAMETERS:
				config = {
					buyer: <Object>,
					itemID: <String>,
					price: float,
					seller: <String> representing userID of seller,
					status: "pending" | "approved" | "precheckout" | "completed"
				}
			
			RETURN VALUE:
				None if the pending order is successfully created
		*/
		create: (config) => {
			const ORDER = config.data;
			const PATH = 'orders/' +
													ORDER.itemID;
			
			return new Promise((resolve, reject) => {
				DATABASE
					.ref(PATH)
					.set(ORDER)
					.then((result) => {
						
						resolve();
						
					})
			})
			
			
		}
		
	}
	
	
	const ORDER_MANAGER = {
		pending: PENDING
	}
	
	return ORDER_MANAGER;
	
}