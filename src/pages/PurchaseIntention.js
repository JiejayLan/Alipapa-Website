import React from 'react';
import uuid from "uuid";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class PurchaseIntention extends React.Component {
	
	
	constructor(props) {
		super(props);
		
		this.state = {
			
			name: '',
			keywords: [],
			input: '',
			message: {
				className: 'text-success',
				text: ''
			}
			
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAddKeyword = this.handleAddKeyword.bind(this);
		this.handleRemoveKeyword = this.handleRemoveKeyword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		
	}
	
	handleNameChange(event) {
		
		this.setState({
			
			name: event.target.value
			
		})
		
	}
	
	handleInputChange(event) {
		
		this.setState({
			
			input: event.target.value
			
		})

	}

	handleAddKeyword(event) {
		
		const NEW_KEYWORD = this.state.input.trim();
		if (NEW_KEYWORD === '')
			return;
		
		this.setState({
			keywords: [... this.state.keywords, NEW_KEYWORD],
			input: ''
		})
		
	}
	
	handleRemoveKeyword(event) {
		
		const REMOVE_KEYWORD_INDEX = parseInt(event.target.dataset.key);
		let newKeywords = this.state.keywords.filter((keyword, index) => {
			
			if (index !== REMOVE_KEYWORD_INDEX) 
				return true;
			
		})
		
		this.setState({
			
			keywords: newKeywords
			
		})
		
	}
	
	
	handleSubmit(event) {
		
		event.preventDefault();
		const SELF = this;
		const NO_INTENTION_NAME = this.state.name === '';
		const NO_KEYWORDS = this.state.keywords.length === 0;

		if (NO_INTENTION_NAME || NO_KEYWORDS) {
			
			this.setState({
				message: {
					className: SELF.state.message.className,
					text: ''
				}
			})
			
			return;
			
		}
		
		const REQUEST_URL = '/purchase-intention/new';
		const POST_DATA = {
			authorID: this.props.user.userID,
			name: this.state.name,
			keywords: this.state.keywords			
		}
		
		axios
			.post(REQUEST_URL, POST_DATA)
			.then((response) => {
				
				switch (response.status) {
					
					case 200: {
						
						this.setState({
							name: '',
							keywords: [],
							input: '',
							message: {
								className: SELF.state.message.className,
								text: 'Successfully created intention'
							}
						})
						
						setTimeout(() => {
							
							this.setState({
								message: {
									className: SELF.state.message.className,
									text: ''
								}
							})
							
						}, 2000)
						
						break;
						
					}
					
					default: {
						
						//	Failed to create
						
					}
					
				}
				
			})
		
	}
	
	
	render() {
		
		const NAME = this.state.name;
		const INPUT_VALUE = this.state.input;
		const SYSTEM_MESSAGE_TEXT = this.state.message.text;
		const SYSTEM_MESSAGE_CLASS = this.state.message.className;
		
		let keywords = this.state.keywords.map((keyword, index) => {
			
			const KEY = index.toString();
			
			return (
				<Row key={KEY} className='pt-1'>
					<Col xs={8}>
						<Form.Control disabled value={keyword}/>
					</Col>
						<Button 
							as={Col} 
							xs={1} 
							variant='danger' 
							data-key={KEY}
							onClick={this.handleRemoveKeyword}>
							-
						</Button>
				</Row>
			)
			
		})
		
		
		return (
			<div>
				<Container fluid={true}>
					
					<Row>
					
						<Col sm={6}>
							
							<h2>
								New Purchase Intention
							</h2>
							
							<Form>
								<Form.Group controlId='name'>
									<Form.Label><b>Name</b></Form.Label>
									<Form.Control value={NAME} onChange={this.handleNameChange} placeholder="ex: New garbage can" />
								
								</Form.Group>
								
								<Form.Group controlId='keywords'>
									
									<Form.Label><b>Keywords</b></Form.Label>
									
									{keywords}

									<Row className='pt-1'>
										<Col xs={8}>
										
											<Form.Control 
												placeholder='ex: bottle' 
												value={INPUT_VALUE} 
												onChange={this.handleInputChange} />
												
										</Col>

											<Button 
												as={Col} 
												xs={1} 
												variant='success' 
												onClick={this.handleAddKeyword}>
												+
											</Button>
									</Row>
									
								</Form.Group>
								
								<Form.Group controlId='message' className={SYSTEM_MESSAGE_CLASS}>
									<Form.Label>
										<b>
											<i>
												{SYSTEM_MESSAGE_TEXT}
											</i>
										</b>
									</Form.Label>
								</Form.Group>
								
								<Button variant="primary" type="submit" onClick={this.handleSubmit}>
									Submit
								</Button>
							
							</Form>
							
						</Col>
						
					</Row>
				
				</Container>
				
			</div>
			
		)
		
	}
	
	
}


const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.userID,
	user: state.auth
})


export default connect(mapStateToProps)(PurchaseIntention);