;

module.exports = (data) => {
	
	const ORDER_MANAGER = data.ORDER_MANAGER;
	const ITEM_MANAGER = data.ITEM_MANAGER;
	const MESSAGE_SYSTEM = data.MESSAGE_SYSTEM;
	const DATABASE = data.firebase.database;
	
	return (req, res) => {
		
		const ORDER_ID = req.params.orderId;
		const DECISION = req.params.decision;
	
		
		switch(DECISION) {
			
			case 'approve': {
				
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
					
				break;
			}
			
			case 'reject': {
				
				const PRE_MESSAGE = `ORDER ${ORDER_ID} REJECTED: `;
				const NOTE = req.body.note;
				const MESSAGE = PRE_MESSAGE + NOTE;
				
				//	Check order exists
				ORDER_MANAGER
					.getOne({ id: ORDER_ID})
					.then((order) => {
						
						const ITEM_ID = order.itemID;
						
						if (order !== null) {
							
							//	Check item exists
							ITEM_MANAGER
								.Store
								.getOne({ id: ITEM_ID })
								.then((item) => {
									
									if (item !== null) {
										
										//	Update order
										ORDER_MANAGER
											.update({
												id: ORDER_ID,
												data: {
													status: 'rejected'
												}
											})
											.then(() => {
												
												const UPDATE_ITEM_CONFIG = {
													id: ITEM_ID,
													item: {
														... item,
														status: 'expired'
													}
												}
												
												//	Update item
												ITEM_MANAGER
													.Store
													.update(UPDATE_ITEM_CONFIG)
													.then(() => {
														
														const BUYER_ID = order.buyer;
														const SELLER_ID = order.seller;
														
														//	Get buyer
														DATABASE
															.ref('users')
															.child(BUYER_ID)
															.once('value')
															.then((buyerSnapshot) => {
																
																//	Get seller
																DATABASE
																	.ref('users')
																	.child(SELLER_ID)
																	.once('value')
																	.then((sellerSnapshot) => {
																		
																		const BUYER = buyerSnapshot.val();
																		const SELLER = sellerSnapshot.val();
																		
																		//	Send Message
																		MESSAGE_SYSTEM
																			.send({
																				messageType: 'message',
																				description: MESSAGE,
																				receiver: BUYER.username,
																				sender: BUYER.username
																			})
																			.then((response) => {
																				
																				//	Successfully sent message
																				if (response.status === 'success') {
																					
																					res
																						.status(200)
																						.end();
																					
																				} else {
																					
																					//	Failed to send message
																					res
																						.status(500)
																						.json(response)
																					
																				}
																				
																			})
																			
																		
																	})
																
															})
														
														
													})
												
											})
										
										
									} else {
										
										//	item does not exist
										
									}
									
								})
							
							
						} else {
							
							//	order does not exist
							
						}
						
					})
				
				break;
			}
			
			default: {
				
				//	Path not found
				res
					.status(404)
					.end()
				
			}
			
		}

		
	}
	
}