import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class OrderConfirmation extends React.Component {
	
	constructor(props) {
		super(props)
		
		//	Initial state
		this.state = {
			status: 'loading',
			order: undefined
		}
		
		
		//	Find order based on ID
		const URL = `/controllers/checkout/${props.match.params.orderid}`;
		axios
			.get(URL)
			.then((response) => {
				
				const RESPONSE_STATUS_CODE = response.status;
				
				switch(RESPONSE_STATUS_CODE) {
					
					//	Order found
					case 200: {
						
						this.setState({
						
							status: 'good',
							order: response.data.order,
							item: response.data.item,
							orderSummary: response.data.orderSummary
							
						})
						
						break;
						
					}
					
				}
				
			})
		
	}
	
	
	
	render() {
		
		const PAGE_STATUS = this.state.status;
		
		switch(PAGE_STATUS) {
			
			case 'loading': {
				
				return null;
				break;
				
			}
			
			default: {
				
				const ORDER_ID = this.props.match.params.orderid;
				const ITEM_LINK = `/items/${this.state.order.itemID}`;
				const ITEM_TITLE = this.state.item.title;
				const DISCOUNTS = this.state.orderSummary.discounts.map((discount) => {
					return (
						<Row className='pt-2' key={discount.name}>
							<Col sm={6}>
								<h4>{discount.name}</h4>
							</Col>
							
							<Col sm={6} className='text-right'>
								<h4>{`-${discount.amount}`}</h4>
							</Col>
						</Row>
					)
				})
				const TAXES = this.state.orderSummary.taxes.map((tax) => {
					return (
						<Row className='pt-2' key={tax.name}>
							<Col sm={6}>
								<h4>{tax.name}</h4>
							</Col>
							
							<Col sm={6} className='text-right'>
								<h4>{`+${tax.amount}`}</h4>
							</Col>
						</Row>
					)
				})
		
				return (
					<Container className='mt-3'>
						<Row>
							<Col sm={7}>
								<div>
									<h2>
										ORDER (<span className='text-warning'>{ORDER_ID}</span>)
									</h2>
									<hr />
									<h2>
										<a href={ITEM_LINK}>{ITEM_TITLE}</a>
									</h2>
								</div>
								<div>
								
								</div>
							</Col>
							
							<Col sm={5}>
								<Row>
									<Col className='text-center'>
										<Button variant='warning' className='btn-lg'>
											<h2>PLACE YOUR ORDER</h2>
										</Button>
									</Col>
								</Row>
								
								<hr />
								
								<Row className='pt-2'>
									<Col sm={6}>
										<h4>Price</h4>
									</Col>
									
									<Col sm={6} className='text-right'>
										<h4>{this.state.orderSummary.price}</h4>
									</Col>
								</Row>
								{DISCOUNTS}
								<hr />
								
								<Row className='pt-2'>
									<Col sm={6}>
										<h4>Pre-tax Total</h4>
									</Col>
									
									<Col sm={6} className='text-right'>
										<h4>{this.state.orderSummary.preTaxTotal}</h4>
									</Col>
								</Row>
								{TAXES}
								<hr />
								
								<Row className='pt-2 text-danger'>
									<Col sm={6}>
										<h2>ORDER TOTAL</h2>
									</Col>
									
									<Col sm={6} className='text-right'>
										<h2>{this.state.orderSummary.afterTaxTotal}</h2>
									</Col>
								</Row>
								
							</Col>

						</Row>
					</Container>
				
				)
				
			}
			
		}
		
	}
	
	
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.userID,
	user: state.auth
})


export default connect(mapStateToProps)(OrderConfirmation);