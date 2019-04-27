import React from 'react';
import Modal from 'react-modal';



export default class GradeSellerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      rating: 3
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    let modalIsOpen = true;
    this.setState(() => ({modalIsOpen}));
  }

  closeModal() {
    let modalIsOpen = false;
    this.setState(() => ({modalIsOpen}));
  }

  handleOptionChange = (e) => {
    let rating = parseInt(e.target.value);
    this.setState(() => ({rating}));
  }

  render(){
    return(
      <div>
        <button className="button" onClick={this.openModal}>
          Grade seller
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Select Your Rating"
          closeTimeoutMS={200}
        >
          <div>1 being the worst</div>
          <div>5 being the best</div>
          
          <div>
            <label>
              <input 
                type="radio" 
                selected 
                value="1"
                checked={this.state.rating === 1}
                onChange={this.handleOptionChange}
              />
              1
            </label>

            <label>
              <input 
                type="radio" 
                value="2"
                checked={this.state.rating === 2}
                onChange={this.handleOptionChange}
              />
              2
            </label>

            <label>
              <input 
                type="radio" 
                value="3"
                checked={this.state.rating === 3}
                onChange={this.handleOptionChange}
                />
              3
            </label>
          
            <label>
              <input 
                type="radio" 
                value="4"
                checked={this.state.rating === 4}
                onChange={this.handleOptionChange}
              />
              4
            </label>

                      
            <label>
              <input 
                type="radio" 
                value="5"
                checked={this.state.rating === 5}
                onChange={this.handleOptionChange}
              />
              5
            </label>
          </div>

          <button className="button" onClick={this.closeModal}>Submit</button>
        </Modal>
      </div>
    );
  }
}