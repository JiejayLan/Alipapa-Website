import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase';




class ItemPage extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			title: '',
			price: {
				type: undefined,
				min: undefined,
				max: undefined,
				current: undefined
			},
			description: '',
			seller: '',
		}
		
		const ITEM_ID = props.match.params.id;
		
		const ITEMS_STORAGE_REF = firebase.database().ref('total_items');
		ITEMS_STORAGE_REF.child(ITEM_ID).once('value').then((snapshot) => {
			
			const ITEM = snapshot.val()
			
			if (ITEM === null) {
				
				//	redirect to not found page
			
			} else {
				
				
				this.setState({
					title: ITEM.name,
					price: {
						type: ITEM.price_type,
						min: ITEM.min_price,
						max: ITEM.max_price,
						current: ITEM.current_price
					},
					description: ITEM.description,
					seller: ITEM.seller,
				})
				
				
				
			}
			
		});
		
	}

	formatPrice(price) {
		
		let valid_price = price >= 0;
		
		if (valid_price) {
			
			return '$' + price;
			
		}
		
		return '';
		
	}
	
	render() {
	
		//	Data below will reside in state
		const PAGE_TITLE = this.state.title;
		//	Rating stars need own component that returns different # of stars
		const RATING_STARS = <img className='img-fluid' src='http://css-stars.com/wp-content/uploads/2013/12/4-stars.jpg' />;
		const PRICE = this.formatPrice(this.state.price.current);
		const CURRENT_BID = this.formatPrice(this.state.price.current);
		const KEYWORDS = 'Garbage Can, Trash, Stainless, Step';
		const SELLER = this.state.seller;
		
		return (
			<div>
				<Container>
					
					<Row>
						<Col sm={6}>
							<div>
								<img className='img-fluid' src='https://images-na.ssl-images-amazon.com/images/I/91t4TlUrzuL._SL1500_.jpg' />
							</div>
							<div>
								{KEYWORDS}
							</div>
						</Col>
						<Col sm={6}>
							<Row>
								<Col sm>
									<h1 className='display-3'>
									{PAGE_TITLE}
									</h1>
								</Col>
							</Row>
							<Row>
									<Col>
										<Row>
											<Col>Sold By:</Col>
										</Row>
										<Row>
											<Col xs={{ offset: 1}}>
												<span className='h3'>
													{SELLER}
												</span>
											</Col>
										</Row>
										<Row>
											<Col xs={{ offset:1, span: 3}}>
												{RATING_STARS}
											</Col>
										</Row>
									</Col>
									
							</Row>
							<Row>
								<Col sm>
									<span className='display-4 text-danger'>
										{PRICE}
									</span>
								</Col>
							</Row>
							
							
							<Row>
								<Col sm>
									<span className='display-4'>
										Current Bid:
									</span>
									<span className='display-4 text-danger'>
										{CURRENT_BID}
									</span>
								</Col>
							</Row>
							
							
							<Row className='pt-4'>
								<Col sm>
									<button className='btn btn-lg btn-warning col-sm-6'>
										<span> BUY </span>
									</button>
								</Col>
							</Row>
							
							<form className='row pt-4 ml-1'>
							
									<div className='col-sm-2 no-gutters bg-secondary text-center h2'>
										<span className="h2">
											$
										</span>
									</div>
									<input className='col-sm-6 input-control h2' />
									<button className="col-sm-4 no-gutters btn btn-warning h2">
										<span className="h2">
											BID
										</span>
									</button>
									
							
							</form>
							
						</Col>
					</Row>
				</Container>
			</div>
		)
		
	}
}


export default ItemPage;