import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import sellingForm from '../pages/sellItemForm';
import ItemPage from '../components/ItemPage';
import HomePage from '../components/HomePage';
import RegisterPage from '../components/RegisterPage';
import ProfilePage from '../components/ProfilePage';
import EditProfilePage from '../components/EditProfilePage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>

      <PublicRoute path="/register" component={RegisterPage}/>
      <LoginRoute path="/login" component={LoginPage} exact={true}/>
      <PublicRoute path="/" component={HomePage} exact={true}/>
      <PublicRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
      <PrivateRoute path="/items/:id" component={ItemPage} exact={true}/>
      <PrivateRoute path="/editProfile/:id" component={EditProfilePage}/>
      <PrivateRoute path="/profile" component={ProfilePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;