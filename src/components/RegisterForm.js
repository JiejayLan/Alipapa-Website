import React from 'react';
import {connect} from 'react-redux';

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: props.auth ? props.auth.username : '',
      credit_card: props.auth ? props.auth.credit_card : '',
      address: props.auth ? props.auth.address : '',
      address_state: '',
      phone_number: props.auth ? props.auth.phone_number : ''
    };
  }

  onNameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({username}));
  };

  onCreditCardChange = (e) => {
    const credit_card = e.target.value;
      this.setState(() => ({credit_card}));
  };

  onAddressChange = (e) => {
    const address = e.target.value;
      this.setState(() => ({address}));
  };

  onSelectStateChange = (e) => {
    const address_state = e.target.value;
    this.setState(() => ({address_state}));
  };

  onPhoneNumberChange = (e) => {
    const phone_number = e.target.value;
      this.setState(() => ({phone_number}));
  };

  onSubmit = (e) => {
    e.preventDefault();
      this.props.onSubmit({
        username: this.state.username,
        credit_card: this.state.credit_card,
        address: this.state.address,
        address_state: this.state.address_state,
        phone_number: this.state.phone_number
      });
  };

  render(){
    const STATE_ARR = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    return (
      <form className="form" onSubmit={this.onSubmit}>
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
          placeholder="Full Address"
          className="text-input"
          value={this.state.address}
          onChange={this.onAddressChange}
          required
          title="Full address"
        />

        <select className="select" required="required" onChange={this.onSelectStateChange}>
          <option value="Please confrim your state">Please confirm your state</option>
          {
            STATE_ARR.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          }
        </select>

        <input
          type="text"
          placeholder="Phone number"
          className="text-input"
          value={this.state.phone_number}
          onChange={this.onPhoneNumberChange}
          required
          pattern="\d{10}"
          title="10 digits phone number (no spaces and dashes in between)"
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

export default connect(mapStateToProps)(RegisterForm);