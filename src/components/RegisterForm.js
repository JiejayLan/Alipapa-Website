import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name: props.application ? props.application.name : '',
      password: props.application ? props.application.password : '',
      creditCard: props.application ? props.application.creditCard : '',
      address: props.application ? props.application.address : '',
      phoneNumber: props.application ? props.application.phoneNumber : '',
      error: ''
    };
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({name}));
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  };

  onCreditCardChange = (e) => {
    const creditCard = e.target.value;
   //if(!creditCard){
      this.setState(() => ({creditCard}));
    //} 
  };

  onAddressChange = (e) => {
    const address = e.target.value;
    //follows U.S. address format
    const addressno = /(\d+) ((\w+[ ,])+ ){2}([a-zA-Z]){2} (\d){5}$/;
    //if(!address){
      this.setState(() => ({address}));
    //}
  };

  onPhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    //matches the following 3 formats
    //XXX-XXX-XXXX
    //XXX.XXX.XXXX
    //XXX XXX XXXX
    //if (!phoneNumber){ 
      this.setState(() => ({phoneNumber}));
   // }
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    if (!this.state.name) {
      this.setState(() => ({error: 'Please provide name.'}));
    } else if (!this.state.password) {
      this.setState(() => ({error: 'Please provide password.'}));
    } else if (!this.state.creditCard) {
      this.setState(() => ({error: 'Please provide credit card.'}));
    } else if (!this.state.address) {
      this.setState(() => ({error: 'Please provide address.'}));
    } else if (!this.state.phoneNumber) {
      this.setState(() => ({error: 'Please provie phone number.'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        name: this.state.name,
        password: this.state.password,
        creditCard: this.state.creditCard,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber
      });
    }
  };

  render(){
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Name"
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="text"
          placeholder="Password"
          className="text-input"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input
          type="text"
          placeholder="Credit Card"
          className="text-input"
          value={this.state.creditCard}
          onChange={this.onCreditCardChange}
        />
        <input
          type="text"
          placeholder="Address"
          className="text-input"
          value={this.state.address}
          onChange={this.onAddressChange}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="text-input"
          value={this.state.phoneNumber}
          onChange={this.onPhoneNumberChange}
        />
        <div>
          <button className="button">Submit Application</button>
        </div>
      </form>
    );
  }
}