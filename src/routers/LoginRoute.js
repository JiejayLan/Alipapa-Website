// import React from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';


// export const LoginRoute = ({
//   isAuthenticated, 

//   component: Component,
//   ...rest
// }) => {
//   console.log(isAuthenticated, status);
//   return  ( <Route {...rest} component={(props) => (
//     isAuthenticated  ? (
 
//       <Redirect to="/dashboard"/>
      
//     ) : 
//       <Component {...props}/>
//   )}/>)
// };

// const mapStateToProps = (state) => {
//   let isAuthenticated = {
//     isAuthenticated: !!state.auth.userID,
   
//   }
  
//   console.log("check login", isAuthenticated );
//   return {isAuthenticated, status };
// }

// export default connect(mapStateToProps)(LoginRoute);
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const LoginRoute = ({
  isAuthenticated, 
  status,
  component: Component,
  ...rest
}) => {
    return(  
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        status == "newUser"?
        <Redirect to="/editProfile/id"/>:
        <Redirect to="/"/>
      ) : 
      (
      <Component {...props}/>
      )
    )}/>
)};

const mapStateToProps = (state) => {

  let isAuthenticated = {
    isAuthenticated: !!state.auth.userID,
    status :state.auth.status
  }
  return isAuthenticated ;
}

export default connect(mapStateToProps)(LoginRoute);