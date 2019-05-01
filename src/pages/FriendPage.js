import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const styles = theme => ({
  container: {

    textAlign: "center",

    border: "1px solid black"
  },
  textField: {
    margin: "20px auto",
  },
  list: {
    margin: "20px auto",
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    margin: "20px auto",
    padding: "0",
    width: '70%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: "20px 5px",
  },
});


class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userType: '',
      newFriend: '',
      friendList: []
    };
  }
  componentWillMount() {
    this.setState({
      userType: this.props.user.user_type,
      userName: this.props.user.username,
      userID: this.props.user.userID,
    })
  }

  componentDidMount() {
    axios.post('/friend/listfriend', {
      userID: this.state.userID
    })
      .then((response) => {
        let frinedList = [];
        let friends = response.data;
        for (let id in friends) {
          frinedList.push(friends[id]);
        }
        console.log("friendlist", frinedList);
        this.setState({ friendList: frinedList });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete = (index)=>{
    console.log("You want to delete friend", this.state.friendList[index]);
    axios.post('/friend/deletefriend', {
      userID: this.state.userID,
      friendName:this.state.friendList[index]
    })
      .then((response) => {
        console.log("delete friend",response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSumit = () => {
    // console.log("add a new friend");
    axios.post('/friend/addfriend', {
      userID: this.state.userID,
      friendName:this.state.newFriend
    })
      .then((response) => {
        console.log("add a new friend",response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { classes } = this.props;

    return (
      <div >
        <div className={classes.container}>
          <TextField
            id="outlined-uncontrolled"
            label="New Friend Name"
            placeholder="New Friend Name"
            name="newFriend"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleUpdate}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSumit}
            className={classes.button}>
            ADD
          </Button>

        </div>
        <List dense className={classes.list}>
          {this.state.friendList.map((value,index) => (
            <ListItem key={value} button className={classes.listItem}>
              {value}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick = {(e)=>{this.handleDelete(index)}}
                >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </div>

    );
  }
}

Friend.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.auth
});

export default withStyles(styles)(connect(mapStateToProps)(Friend));




