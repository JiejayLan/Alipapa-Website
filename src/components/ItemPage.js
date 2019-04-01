import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import {database,storage} from '../firebase/firebase';

class ItemPage extends React.Component {
	
	constructor(props) {
		super(props);
		
	}
	
	
	render() {
		
		return (
		
			<div className='container'>
				
				<div className='row'>
					<div className='col-sm-6'>
						<div>
							<img className='img-fluid' src='https://images-na.ssl-images-amazon.com/images/I/91t4TlUrzuL._SL1500_.jpg' />
						</div>
						<div>
							Garbage Can, Trash, Stainless, Step
						</div>
					</div>
					<div className='col-sm-6'>
						<div className='row'>
							<div className='col-sm'>
									<h1 className='display-3'>
										simplehuman Profile Step Trash Can, Brushed Stainless Steel, 10 Liters
									</h1>
							</div>
						</div>
						<div className='row'>
							<div className='col-sm-4'>
								<img className='img-fluid' src='http://css-stars.com/wp-content/uploads/2013/12/4-stars.jpg' />
							</div>
						</div>
						<div className='row'>
							<div className='col-sm'>
								<span className='display-4 text-danger'>
									$25.99
								</span>
							</div>
						</div>
						<div className='row pt-4'>
							<div className='col-sm'>
								<button className='btn btn-lg btn-warning col-sm-6'>
									<span> BUY </span>
								</button>
							</div>
						</div>
						
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
					</div>
				</div>
			</div>
		
		)
		
	}
}


export default ItemPage;