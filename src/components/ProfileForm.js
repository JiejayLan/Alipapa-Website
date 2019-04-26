import React from 'react';
import {connect} from 'react-redux';

class ProfileForm extends React.Component {
  constructor(props){
    super(props);
    //figure out why props.profile is not displaying
    this.state={
      username: props.auth ? props.auth.username : '',
      password: props.auth ? props.auth.password : '',
      credit_card: props.auth ? props.auth.credit_card : '',
      address: props.auth ? props.auth.address : '',
      phone_number: props.auth ? props.auth.phone_number : ''
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProfileForm);