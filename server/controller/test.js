;


module.exports = (data) => {	
	
	return (req, res) => {
		
		const ITEM_MANAGER = data.itemManager;
		const APPLICATIONS = ITEM_MANAGER.applications;
		const NEW_ITEM_INFO = req.body;	
		
		
		APPLICATIONS
			.create(NEW_ITEM_INFO)
			.then((result) => {
				
				console.log('RESULT:' + result);
				
			})
		
	}
	
}