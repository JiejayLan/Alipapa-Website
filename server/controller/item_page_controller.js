;


module.exports = (data) => {	
	
	const ITEM_PAGE_CONTROLLER = (req, res) => {
		
		const ITEM_ID = req.params.id;
		
		const ITEM_MANAGER = data.itemManager;
		const STORE = ITEM_MANAGER.store;
		
		const config = {
			id: ITEM_ID
		}
		
		STORE
			.getOne(config)
			.then( (item) => {
				
				if (item !== null) {
					
					res
						.status(200)
						.json(item)
						
				} else {
					
					res
						.status(204)
						.json(item)
					
				}
				
			})
		
	}
	
	
	return ITEM_PAGE_CONTROLLER;
	
}