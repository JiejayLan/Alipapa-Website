import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name: props.application ? props.application.name : '',
      password: props.application ? props.application.password : '',
      creditCard: props.application ? props.application.creditCard : '',
      address: props.application ? props.application.address : '',
      phoneNumber: props.application ? props.application.phoneNumber : ''
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
      this.setState(() => ({creditCard}));
  };

  onAddressChange = (e) => {
    const address = e.target.value;
      this.setState(() => ({address}));
  };

  onPhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
      this.setState(() => ({phoneNumber}));
  };

  onSubmit = (e) => {
    e.preventDefault();
      this.props.onSubmit({
        name: this.state.name,
        password: this.state.password,
        creditCard: this.state.creditCard,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber
      });
    
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
          required
        />
        <input
          type="text"
          placeholder="Password"
          className="text-input"
          value={this.state.password}
          onChange={this.onPasswordChange}
          required
        />
        <input
          type="text"
          placeholder="Credit Card"
          className="text-input"
          value={this.state.creditCard}
          onChange={this.onCreditCardChange}
          required
          pattern="\b(?:3[47]\d|(?:4\d|5[1-5]|65)\d{2}|6011)\d{12}\b"
          title="16 digits Visa, MasterCard, American Express, Discover Cards"
        />
        <input
          type="text"
          placeholder="Address"
          className="text-input"
          value={this.state.address}
          onChange={this.onAddressChange}
          required
          pattern="^[a-zA-Z0-9\s,'-]*$"
          title="American address"
        />
        <input
          type="text"
          placeholder="Phone number"
          className="text-input"
          value={this.state.phoneNumber}
          onChange={this.onPhoneNumberChange}
          required
          pattern="\d{10}"
          title="American 10 digits phone number"
        />
        <div>
          <button className="button">Submit Application</button>
        </div>
      </form>
    );
  }
}