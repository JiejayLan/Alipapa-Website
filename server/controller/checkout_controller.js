;

const express = require('express');
const router = express.Router({
	mergeParams: true
});


module.exports = (data) => {
	
	const GET_HANDLER = (req, res) => {
		
		const ORDER_MANAGER = data.ORDER_MANAGER;
		const ITEM_MANAGER = data.ITEM_MANAGER;
		const FRIEND_MANAGER = data.FRIEND_MANAGER;
		const DATABASE = data.firebase.database;
		const ORDER_ID = req.params.orderId;
		
		
		ORDER_MANAGER
			.getOne({id: ORDER_ID})
			.then((order) => {
				
				if (order !== null) {
					
					ITEM_MANAGER
						.Store
						.getOne({id: order.itemID})
						.then((item) => {
							
							FRIEND_MANAGER
								.checkFriend({
									userID: order.seller,
									friendID: order.buyer
								})
								.then((result) => {
									console.log(order.buyer)
									DATABASE
										.ref('users')
										.child(order.buyer)
										.once('value')
										.then((snapshot) => {
											
											const BUYER = snapshot.val();
											const DISCOUNTS = [];
											const TAXES = [];
											
											const IS_FRIEND = result;
											console.log(BUYER.user_type)
											const IS_VIP = BUYER.user_type === 'VIP OU';
											
											if (IS_FRIEND) {
												
												DISCOUNTS.push({
													name: 'Friend Discount',
													amount: ((0.1) * order.price).toFixed(2)
												})
												
											}
											
											if (IS_VIP) {
												
												DISCOUNTS.push({
													name: 'VIP Discount',
													amount: ((0.05) * order.price).toFixed(2)
												})
												
											}
											
											const PRE_TAX_TOTAL = DISCOUNTS.reduce((total, discount) => {
												return total - parseFloat(discount.amount);
											}, order.price).toFixed(2);
											
											const STATE_TAX = ((0.05) * parseFloat(PRE_TAX_TOTAL)).toFixed(2);
											const STATE = 'NY';
											TAXES.push({
												name: `${STATE} State Tax`,
												amount: STATE_TAX
											});
											
											const AFTER_TAX_TOTAL = TAXES.reduce((total, tax) => {
												return total + parseFloat(tax.amount);
											}, parseFloat(PRE_TAX_TOTAL)).toFixed(2)
											
											res
												.status(200)
												.json({
													order: order,
													item: item,
													orderSummary: {
														price: order.price.toFixed(2),
														discounts: DISCOUNTS,
														preTaxTotal: PRE_TAX_TOTAL,
														afterTaxTotal: AFTER_TAX_TOTAL,
														taxes: TAXES,
													}
												})
													
											})
									
								})
							
						})
						
				} else {
					
					res
						.status(404)
						.end();
					
				}
				
			})
		
	}
	
	
	router
		.get('/:orderId', GET_HANDLER);

	
	return router;
}