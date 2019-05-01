;

module.exports = (data) => {
	
	const ORDER_MANAGER = data.ORDER_MANAGER;
	
	return (req, res) => {
		
		const ORDER_ID = req.params.orderId;
		const ORDER_APPROVED = req.params.decision === 'approve';
		
		if (ORDER_APPROVED) {
			
			ORDER_MANAGER
				.createApprovedOrder({
					id: ORDER_ID
				})
				.then((response) => {
					
					res
						.status(201)
						.end()
					
				})
				.catch((error) => {
					
					res
						.status(400)
						.json(error)
					
				})
			
		} else {
			
			//	Change order status
			
			//	Change item status
			
			//	Send message to buyer
			
			
		}
		
	}
	
}