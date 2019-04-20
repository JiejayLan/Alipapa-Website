import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    //may need to change props.application to props.profile
    this.state={
      username: props.application ? props.application.username : '',
      password: props.application ? props.application.password : '',
      credit_card: props.application ? props.application.credit_card : '',
      address: props.application ? props.application.address : '',
      phone_number: props.application ? props.application.phone_number : ''
    };
  }

  onNameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({username}));
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  };

  onCreditCardChange = (e) => {
    const credit_card = e.target.value;
      this.setState(() => ({credit_card}));
  };

  onAddressChange = (e) => {
    const address = e.target.value;
      this.setState(() => ({address}));
  };

  onPhoneNumberChange = (e) => {
    const phone_number = e.target.value;
      this.setState(() => ({phone_number}));
  };

  onSubmit = (e) => {
    e.preventDefault();
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
        credit_card: this.state.credit_card,
        address: this.state.address,
        phone_number: this.state.phone_number
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
          value={this.state.username}
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
          value={this.state.credit_card}
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
          value={this.state.phone_number}
          onChange={this.onPhoneNumberChange}
          required
          pattern="\d{10}"
          title="American 10 digits phone number"
        />
        <div>
          <button className="button">Submit</button>
        </div>
      </form>
    );
  }
}