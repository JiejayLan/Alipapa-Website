import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase';
import axios from 'axios';
import ReviewStars from '../components/ReviewStars.js';


class ItemPage extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			title: undefined,
			price: {
				type: undefined,
				min: undefined,
				max: undefined,
				current: undefined
			},
			keywords: undefined,
			description: undefined,
			seller: undefined,
			sellerRating: undefined,
			status: undefined,
			bidEnd: undefined,
			inputValue: '',
			message: ''
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
						const ITEM = response.data.item;
						const SELLER = response.data.seller;
						
						const newState = {
							title: ITEM.name,
							price: {
								type: ITEM.price_type,
								min: ITEM.price.min,
								max: ITEM.price.max,
								current: ITEM.price.current
							},
							keywords: ITEM.keywords,
							description: ITEM.description,
							seller: ITEM.seller,
							sellerRating: SELLER.rating,
							status: ITEM.status,
							bidEnd: ITEM.bidEnd,
							inputValue: '',
							message: {
								className: 'text-success',
								text: ''
							}
						}
						
						this.setState(newState);
						break;
					}
					
					case 204: {
						
						this.setState({
							title: undefined,
							price: {
								type: undefined,
								min: undefined,
								max: undefined,
								current: undefined
							},
							keywords: undefined,
							description: undefined,
							seller: undefined,
							sellerRating: undefined,
							status: undefined,
							bidEnd: undefined,
							inputValue: '',
							message: {
								className: 'text-success',
								text: ''
							}
						})
						
					}
				
				}
					
			})
			.catch( (error) => {
				
				console.log(error)
				
			})
		
		this.handleFixedBuy = this.handleFixedBuy.bind(this);
		this.handleRangedBuy = this.handleRangedBuy.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleFixedBuy(event) {
		
		const SELF = this;
		const ITEM_ID = this.props.match.params.id;
		const URL = '/controllers/items/' +
								ITEM_ID + 
								'/buy';
		const POST_DATA = {
			buyer: SELF.props.user.userID,
			item: {
				name: SELF.state.title,
				description: SELF.state.description,
				seller: SELF.state.seller,
				price_type: SELF.state.price.type,
				price: {
					max: SELF.state.price.max,
					min: SELF.state.price.min,
					current: SELF.state.price.current,
					previous: SELF.state.price.current
				}
			}
		}
		
		axios
			.post(URL, POST_DATA)
			.then((response) => {
				
				switch(response.status) {
					
					case 200: {
						
						this.setState({
							... SELF.state,
							status: 'order',
							message: {
								className: 'text-success',
								text: 'ORDER CREATED!'
							}
						})
						
						break;
					}
					
				}
				
			})
		
	}
	
	//	Input is a string
	inputIsFloat(input) {
		if (input === '')
			return false;

		let parsed = input.split('.')
		if (parsed.length > 2)
			return false;
		
		let integral = parsed[0];
		let integralIsValid = true;
		for (let i = 0 ; i < integral.length ; i++) {
			
			if (isNaN(integral.charAt(i))) {
				
				integralIsValid = false;
				break;
				
			}
			
		}
		if (parsed.length === 1)
			return integralIsValid;
		

		let fractional = parsed[1];
		let fractionalIsValid = true;
		for (let i = 0 ; i < fractional.length ; i++) {
			
			if (isNaN(fractional.charAt(i))) {
				
				fractionalIsValid = false;
				break;
				
			}
			
		}
		
		return integralIsValid && fractionalIsValid;
	}
	
	handleRangedBuy(event) {
		
		event.preventDefault();
								
		const INPUT_VALUE = this.state.inputValue;
		const INPUT_IS_FLOAT = this.inputIsFloat(INPUT_VALUE);
		const BID_AMOUNT = parseFloat(INPUT_VALUE);
		const CURRENT_HIGHEST_BID = this.state.price.current;
		const MIN_BID = this.state.price.min;
		const MAX_BID = this.state.price.max;
		
		if (INPUT_IS_FLOAT 
				&& MIN_BID <= BID_AMOUNT 
				&& BID_AMOUNT > CURRENT_HIGHEST_BID) {
			
			const SELF = this;
			const ITEM_ID = this.props.match.params.id;
			const URL = '/controllers/items/' +
									ITEM_ID + 
									'/bid';
			
			const POST_DATA = {
				buyer: SELF.props.user.userID,
				bid: BID_AMOUNT
			}
			
			axios
				.post(URL, POST_DATA)
				.then((response) => {
					
					//	update state
					switch(response.status) {
						
						case 200: {
							
							const ITEM = response.data
							const NEW_STATE = {
								title: ITEM.name,
								price: {
									type: ITEM.price_type,
									min: ITEM.price.min,
									max: ITEM.price.max,
									current: ITEM.price.current
								},
								keywords: ITEM.keywords,
								description: ITEM.description,
								seller: ITEM.seller,
								status: ITEM.status,
								bidEnd: ITEM.bidEnd,
								inputValue: SELF.state.inputValue,
								message: {
									className: 'text-success',
									text: 'BID PLACED!'
								}
							}
							
							this.setState(NEW_STATE)
							break;
						}
						
					}
					
				})

		} else {
				
				this.setState({
					... this.state,
					message: {
						className: 'text-warning',
						text: ''
					}
				})
				//	NOTIFY USER TO FIX INPUT
				
		}
		
		
	}
	
	handleInputChange(event) {
		this.setState({
			inputValue: event.target.value
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
		
		const PAGE_TITLE = this.state.title;
		const PRICE_TYPE = this.state.price.type;
		const RATING_STARS = <img className='img-fluid' src='http://css-stars.com/wp-content/uploads/2013/12/4-stars.jpg' />;
		const PRICE = this.formatPrice(this.state.price.current);
		const CURRENT_BID = this.formatPrice(this.state.price.current);
		const MESSAGE_TEXT = this.state.message.text;
		const MESSAGE_CLASS = this.state.message.className;
		const SELLER = this.state.seller;
		const SELLER_RATING = this.state.sellerRating || 0;
		const DESCRIPTION = this.state.description;
		
		const USER_IS_AUTHENTICATED = this.props.isAuthenticated;
		const ITEM_NOT_FOUND = SELLER ? false : true;
		const BUYABLE = this.state.status === 'good';
		const BIDABLE = Date.now() < this.state.bidEnd;
		
		//	Sub components
		const BUY_OPTION = (
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
						<button className='btn btn-lg btn-warning col-sm-6' onClick={this.handleFixedBuy} disabled={!BUYABLE}>
							<span> BUY </span>
						</button>
					</Col>
				</Row>
			</Container>
		)
		
		const BID_OPTION = (
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
				{
					BIDABLE ?
						<form className='row pt-4 ml-1'>
							<div className='col-sm-2 no-gutters bg-secondary text-center h2'>
								<span className="h2">
									$
								</span>
							</div>
							<input value={this.state.inputValue} className='col-sm-6 input-control h2' onChange={this.handleInputChange}/>
							<button className="col-sm-4 no-gutters btn btn-warning h2" onClick={this.handleRangedBuy}>
								<span className="h2">
									BID
								</span>
							</button>
						</form>
					:
						null
				}
			</Container>
		)
		
		const BUY_COMPONENT = USER_IS_AUTHENTICATED ? 
														(PRICE_TYPE === 'fixed' ?
															BUY_OPTION : BID_OPTION) :
														null;
		
		if (ITEM_NOT_FOUND) {
			return (
					<div>
						<h2>
							NOT FOUND
						</h2>
					</div>
			)
		} else {
			return (
				<div>
					<Container>
						
						<Row>
							<Col sm={6}>
								<div>
									<img className='img-fluid' src='https://images-na.ssl-images-amazon.com/images/I/91t4TlUrzuL._SL1500_.jpg' />
								</div>
								<div>
									{
										this.state.keywords ?
										Object.keys(this.state.keywords).reduce((prev, keyword) => prev + ', ' + keyword) :
										null
									}
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
											<Col className='h4'>Description:</Col>
										</Row>
										<Row>
											<Col xs={{ offset: 1}}>
												<span className='lead'>
													{DESCRIPTION}
												</span>
											</Col>
										</Row>
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
													<ReviewStars
														rating={SELLER_RATING}
														className='img-fluid'
													/>
												</Col>
											</Row>
										</Col>
										
								</Row>
								

								{BUY_COMPONENT}
								
								<Container>
									<Row>
										<Col>
											<p className={'h3 ' + MESSAGE_CLASS}>
												{MESSAGE_TEXT}
											</p>
										</Col>
									</Row>
								</Container>
								
							</Col>
						</Row>
					</Container>
				</div>
			)
		}
		
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.userID,
	user: state.auth
})


export default connect(mapStateToProps)(ItemPage);