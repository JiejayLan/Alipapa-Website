; 



module.exports = (data) => {
	
	const ITEM_MANAGER = data.itemManager;
	const INTENTIONS = ITEM_MANAGER.Intentions;
	
	return (req, res) => {
		
		const CREATE_INTENTION_CONFIG = {
			
			data: {
				name: req.body.name,
				authorID: req.body.authorID,
				keywords: req.body.keywords
			}
			
		}
		
		INTENTIONS
			.create(CREATE_INTENTION_CONFIG)
			.then((response) => {
				
				res
					.status(200)
					.end()
				
			})
		
	}
	
}