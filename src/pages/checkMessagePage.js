import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Message from "../components/checkMessagePage/Message"
import MessageHeader from "../components/checkMessagePage/MessageHeader"
import TableHead from '@material-ui/core/TableHead';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { firebase } from '../firebase/firebase';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    width: '30%',
  }
});

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userType: '',
      value: 0,
      message: [],
      complain: [],
      appeal: [],
      warning: []
    };
  }

  classifyMessage(data) {
    let message = [];
    let appeal = [];
    let warning = [];
    for (let id in data) {
      data[id]["messageID"] = id;
      if (data[id]["messageType"] === "message")
        message.push(data[id])
      else if (data[id]["messageType"] === "warning")
        warning.push(data[id]);
      else
        appeal.push(data[id]);
    }
    this.setState({ message });
    this.setState({ appeal });
    this.setState({ warning });

  }

  componentDidMount = () => {
    //test for a chat room
    // firebase.firestore().collection('messages').add({
    //   name: "jay",
    //   text: "hi",
    //   profilePicUrl: "newul",
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // }).catch(function(error) {
    //   console.error('Error writing new message to Firebase Database', error);
    // });


    // var query = firebase.firestore()
    //   .collection('messages')
    //   .limit(12);

    // // Start listening to the query.
    // query.onSnapshot(function (snapshot) {
    //   snapshot.docChanges().forEach(function (change) {
    //     if (change.type === 'removed') {
    //       console.log(change.doc.id);
       
    //     } else {
    //       var message = change.doc.data();
    //       console.log(message);
    //     }
    //   });
    // });
  }


  componentWillMount() {

    //get auth data from redux
    this.setState({
      userType: this.props.user.user_type,
      userID: this.props.user.userID
    })

    //get regular message from firebase   
    axios.post('/message/checkReceive', {
      userID: this.props.user.userID
    })
      .then((response) => {
        let data = response.data;
        this.classifyMessage(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    //check received complain messages
    axios.post('/message/checkComplain', {
      userID: this.props.user.userID
    })
      .then((response) => {
        let complain = [];
        let data = response.data;
        for (let id in data) {
          data[id]["messageID"] = id;
          complain.push(data[id]);
        }
        // console.log(complain);
        this.setState({ complain })
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

  handleChange = (event, value) => {
    this.setState({ value });
  };



  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Message" />
            <Tab label="Warning" />
            <Tab label="Complain" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
          <Paper className={classes.table} >
            <Table >
              <TableHead><MessageHeader /></TableHead>
              <div>
                {this.state.message.map((message) => {
                  return <Message
                    description={message.description}
                    sender={message.sender}
                  />
                })}
              </div>
            </Table>
          </Paper>
        </TabContainer>}
        {value === 1 && <TabContainer>
          <Paper className={classes.table} >
            <Table >
              <TableHead><MessageHeader /></TableHead>
              <div>
                {this.state.warning.map((message) => {
                  return <Message
                    description={message.description}
                    sender={message.sender}
                  />
                })}
              </div>
            </Table>
          </Paper>
        </TabContainer>}
        {value === 2 && <TabContainer>
          <Paper className={classes.table} >
            <Table >
              <TableHead><MessageHeader /></TableHead>
              <div>
                {this.state.complain.map((message) => {
                  return <Message
                    description={message.description}
                    sender={message.sender}
                  />
                })}
              </div>
            </Table>
          </Paper>
        </TabContainer>}
      </div>
    );
  }
}

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.auth
});

export default withStyles(styles)(connect(mapStateToProps)(MessageForm));




