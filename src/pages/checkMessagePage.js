import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
});

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageType:"appeal",
            sender:'',
            complaintedUserID:'',
            receiver:'',
            description:"",
            confirmedType:"false",
            userType:'SU',
            value:0
        };
    }

    componentWillMount(){
        this.setState({
            userType:this.props.user.user_type,
            sender:this.props.user.userID
        })
        if(this.props.user.user_type == 'SU')
            this.setState({messageType:"warning"});
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
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><button>fdf</button></TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
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




