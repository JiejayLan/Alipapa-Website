import React from 'react';


class ReviewStars extends React.Component {
	
	constructor(props) {
		super(props);
		
	}
	
	
	
	render() {
		
		let convertedRating = Math.max(0, this.props.rating);
		convertedRating = Math.min(5, this.props.rating);
		convertedRating = parseInt(Math.round(2 * convertedRating))
		
		const DIRECTORY_PATH = '/images/stars/';
		const IMG_NAME = convertedRating + '-stars.jpg';
		const IMAGE_PATH = DIRECTORY_PATH + IMG_NAME;
		const CLASSES = this.props.className;
		
		return (
			
			<img 
				src={IMAGE_PATH} 
				className={CLASSES}
			/>
			
		)
		
	}
	
}

export default ReviewStars;