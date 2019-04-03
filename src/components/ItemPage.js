import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import {database,storage} from '../firebase/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class ItemPage extends React.Component {
	
	constructor(props) {
		super(props);
		
	}
	
	
	render() {
		
		//	Data below will reside in state
		const PAGE_TITLE = 'simplehuman Profile Step Trash Can, Brushed Stainless Steel, 10 Liters';
		//	Rating stars need own component that returns different # of stars
		const RATING_STARS = <img className='img-fluid' src='http://css-stars.com/wp-content/uploads/2013/12/4-stars.jpg' />;
		const PRICE = '$25.99';
		const KEYWORDS = 'Garbage Can, Trash, Stainless, Step';
		
		return (
		
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
							<Col sm={4}>
								{RATING_STARS}
							</Col>
						</Row>
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
		
		)
		
	}
}


export default ItemPage;