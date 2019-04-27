;

module.exports = (data) => {
	
	let timeout = null;
	const ITEM_MANAGER = data.itemManager;
	const ORDER_MANAGER = data.orderManager;
	
	const RUN = () => {
		
		clearInterval(timeout);
		
		timeout = setInterval(
		
			() => {
				
				const STORE = ITEM_MANAGER.store;
				
				
				STORE
					.getRangedPriceItems()
					.then((response) => {
						
						response.forEach((itemWrapper) => {
							const NOW = Date.now();
							const AUCTION_END = itemWrapper.data.bidEnd;
							const ITEM_ID = itemWrapper.id;
							const ITEM = itemWrapper.data;
							
							if (NOW > AUCTION_END) {
								
								const UPDATED_ITEM_STATUS = ITEM.buyer ? 'order' : 'expired';
								const UPDATED_ITEM = {
									
									... ITEM,
									status: UPDATED_ITEM_STATUS
									
								}

								STORE
									.update({
										id: ITEM_ID,
										item: UPDATED_ITEM
									})
									.then(() => {
										
										if (UPDATED_ITEM_STATUS === 'order') {
											
											const PENDING_ORDERS = ORDER_MANAGER.Pending;
											const CREATE_PENDING_CONFIG = {
												data: {
													buyer: ITEM.buyer,
													itemID: ITEM_ID,
													price: ITEM.price.current,
													seller: ITEM.seller,
													status: 'pending'
												}
											}
											
											PENDING_ORDERS
												.create(CREATE_PENDING_CONFIG)
											
										}
										
									})
								
							}
							
							
						})
						
					})
				
			},
			
			//	check every 120 seconds for testing
			1000 * 60 * 2
			
		)
		
	}
	
	
	return {
		
		run: RUN
		
	}
	
}