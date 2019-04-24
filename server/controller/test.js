;


module.exports = (data) => {	
	
	const ITEM_MANAGER = data.itemManager;
	const APPLICATIONS = ITEM_MANAGER.applications;
	
	return (req, res) => {
		
		let config = {
			
			id: req.body.id
			
		}
		
		/*
		APPLICATIONS
			.create(req.body)
			.then((result) => {
				
			})
			*/
	
		
		APPLICATIONS
			.getMultiple(config)
			.then((applications) => {
				console.log(applications)
				console.log("SUCCESS:" + applications.length);
			})
		
		
		
	}
	
}