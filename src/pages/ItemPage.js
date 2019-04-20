import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase';
import axios from 'axios';



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
		
		const URL = '/controllers/items/' +
								props.match.params.id;
		
		axios
			.get(URL)
			.then( (response) => {
				
				const RESPONSE_STATUS_CODE = response.status;
				
				switch (RESPONSE_STATUS_CODE) {
				
					case 200: {
						
						//	found item
						const ITEM = response.data
						console.log(ITEM)
						
						const newState = {
							title: ITEM.name,
							price: {
								type: ITEM.price_type,
								min: ITEM.price.min,
								max: ITEM.price.max,
								current: ITEM.price.current
							},
							description: ITEM.description,
							seller: ITEM.seller,
						}
						
						this.setState(newState);
						
					}
					
					case 204: {
						
						//	redirect
						
					}
				
				}
					
			})
			.catch( (error) => {
				
				console.log(error)
				
			})
		
	}

	formatPrice(price) {
		
		let valid_price = price >= 0;
		
		if (valid_price) {
			
			return '$' + price;
			
		}
		
		return '';
		
	}
	
	render() {
	
		const USER_IS_AUTHENTICATED = this.props.isAuthenticated;
		
		const PAGE_TITLE = this.state.title;
		const PRICE_TYPE = this.state.price.type;
		const RATING_STARS = <img className='img-fluid' src='http://css-stars.com/wp-content/uploads/2013/12/4-stars.jpg' />;
		const PRICE = this.formatPrice(this.state.price.current);
		const CURRENT_BID = this.formatPrice(this.state.price.current);
		const KEYWORDS = 'Garbage Can, Trash, Stainless, Step';
		const SELLER = this.state.seller;
		
		//	Sub components
		const BUY_COMPONENT = (
			<Container>
				<Row>
					<Col sm>
						<span className='display-4 text-danger'>
							{PRICE}
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
			</Container>
		)
		
		const BID_COMPONENT = (
			<Container>
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
			</Container>
		)
		
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
							{USER_IS_AUTHENTICATED ? 
								(PRICE_TYPE === 'fixed' ?
									BUY_COMPONENT :
									BID_COMPONENT) :
								null}
							
						</Col>
					</Row>
				</Container>
			</div>
		)
		
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.userID
})


export default connect(mapStateToProps)(ItemPage);