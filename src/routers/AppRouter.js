import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import sellingForm from '../components/sellItemForm';
import ItemPage from '../components/ItemPage';
import HomePage from '../components/HomePage';
import RegisterPage from '../components/RegisterPage';
import ProfilePage from '../components/ProfilePage';
import EditProfilePage from '../components/EditProfilePage';
//change /register to publicroute after the logic for login is setup


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PrivateRoute path="/register" component={RegisterPage}/>
      <PublicRoute path="/" component={LoginPage} exact={true}/>
      <PrivateRoute path="/home" component={HomePage} exact={true}/>
      <PrivateRoute path="/items/:id" component={ItemPage} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
      <PrivateRoute path="/editProfile/:id" component={EditProfilePage}/>
      <PrivateRoute path="/profile" component={ProfilePage}/>
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;