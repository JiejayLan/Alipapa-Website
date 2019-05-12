;

const express = require('express');
const router = express.Router({
	mergeParams: true
});
const STATE_TAXES = {
	AL: 9.17, AK: 0, AZ: 5.6, AR:6.5, CA: 7.25, CO: 2.9, CT: 6.35, DC: 6, DE: 0, FL: 6, GA: 4, HI: 4, ID: 6, IL: 6.25, IN: 7, IA: 6, KS: 6.5, KY: 6, LA: 4.45, ME: 5.5, MD: 6, MA: 6.25, MI: 6, MN:6.875, MS: 7, MO: 4.225, MT: 0, NE: 5.5, NV: 6.85, NH: 0, NJ: 6.625, NM: 5.125, NY: 4, NC: 4.75, ND: 5, OH: 5.75, OK: 4.5, OR: 0, PA: 6, PR: 11.5, RI: 7, SC: 6, SD: 4.5, TN: 7, TX: 6.25, UT: 4.85, VT: 6, VA: 4.3, WA: 6.5, WV: 6, WI: 5, WY: 4
}


module.exports = (data) => {
	
	const ORDER_MANAGER = data.ORDER_MANAGER;
	const ITEM_MANAGER = data.ITEM_MANAGER;
	const FRIEND_MANAGER = data.FRIEND_MANAGER;
	const DATABASE = data.firebase.database;
	
	const GET_HANDLER = (req, res) => {
		
		
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
									
									DATABASE
										.ref('users')
										.child(order.buyer)
										.once('value')
										.then((snapshot) => {
											
											const BUYER = snapshot.val();
											const DISCOUNTS = [];
											const TAXES = [];
											
											const IS_FRIEND = result;
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
											
											const STATE = BUYER.address_state;
											const STATE_TAX = ((STATE_TAXES[STATE] / 100) * parseFloat(PRE_TAX_TOTAL)).toFixed(2);
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
	
	const POST_HANDLER = (req, res) => {
		
		//	get user info
		//	check balance
		//		1. 403: if not enough money
		//		2. 200: update order and user balance
		
		const BUYER_ID = req.body.order.buyer;
		const ORDER_ID = req.body.orderId;
		
		DATABASE
			.ref('users')
			.child(BUYER_ID)
			.once('value')
			.then((snapshot) => {
				
				const BUYER = snapshot.val();
				const ORDER_TOTAL = req.body.orderSummary.afterTaxTotal;
				
				if (BUYER.balance >= ORDER_TOTAL) {
					
					const NEW_BALANCE = BUYER.balance - ORDER_TOTAL;
					ORDER_MANAGER
						.getOne({id: ORDER_ID})
						.then((order) => {
							
							if (order.status === 'approved') {
								
								DATABASE
									.ref('users')
									.child(BUYER_ID)
									.update({
										balance: NEW_BALANCE
									})
									.then((response) => {
										
										ORDER_MANAGER
											.update({
												id: ORDER_ID,
												data: {
													status: 'completed'
												}
											})
											.then(() => {
												
												res
													.status(200)
													.end();
												
											})
										
									})
								
							} else {
								
								res
									.status(403)
									.end('There was an error completing your order');
									
							}
							
						})
						
				} else {
					
					res
						.status(403)
						.end('Insufficient funds')
					
				}
				
				
			})
		
	}
	
	
	router
		.get('/:orderId', GET_HANDLER)
		.post('/:orderId', POST_HANDLER)

	
	return router;
}