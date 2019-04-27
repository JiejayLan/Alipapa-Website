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
  table:{
    width: '30%',
  }
});

class Friend extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          userID:'',
          userType:'',
          value:0,
          message:[],
          complain:[],
          appeal:[],
          warning:[]
      };
  }
  componentWillMount(){
    this.setState({
      userType:this.props.user.user_type,
      userName:this.props.user.username,
      userID:this.props.user.userID,
  })
  }

  componentDidMount(){

    axios.post('/friend/listfriend', {
      userID:this.state.userID
    })
    .then( (response)=> {
      let frinedList =[];
      for(let friend in response.data){
        frinedList.push(friend);
      }
      console.log("friendlist",frinedList);
      this.setState({friendList});

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


    return (
      <div >
       Friendgfgfdgfg
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




