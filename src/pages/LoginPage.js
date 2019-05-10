import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { taboo } from '../actions/taboo';
import uuid from "uuid";
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "username": "SU",
      "password": "123"
    };
  }

  handleSubmit = () => {
    //Set up correct username and password for login convenience
    axios.post('/login', {
      "username": this.state.username,
      "password": this.state.password
    })
      .then(async (response) => {
        //successfully login
        if (response.data.userID) {
          if (response.data.status === "suspended") {
            setTimeout(() => {
              this.props.startLogin(response.data);
            }, 2000);
            alert("WARNING:Your account has been suspended. You can choose to submit an appeal");
          }
          else if (this.state.username == this.state.password) {
            setTimeout(() => {
              this.props.startLogin(response.data);
            }, 2000);
            alert("WARNING:New User must change password after first time login");
          }
          else
            this.props.startLogin(response.data);
        }
        else {
          alert("Wrong username or password");
        }
        // alert suspended user

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //get all taboo keyword from firebase
  checkTaboo = () => {
    return axios.get('/taboo')
      .then(function (response) {
        return response.data;
      })
  }

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">

          <label className="label">
            Username:
              <input className="text-input" type="text" name={"username"} onChange={() => {
              this.setState({ "username": event.target.value });
            }}
            />
          </label>

          <label className="label">
            Password:
              <input className="text-input" type="text" name={"password"} onChange={() => {
              this.setState({ "password": event.target.value });
            }}
            />
          </label>

          <div>
            <button className="button--alt" type="button" onClick={() => this.handleSubmit()} >Submit</button>
          </div>

        </div>
      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => ({
  startLogin: (userData) => dispatch(login(userData)),
  checkTaboo: (tabooList) => dispatch(taboo(tabooList))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
