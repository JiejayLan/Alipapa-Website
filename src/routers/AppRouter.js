import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import sellingForm from '../pages/sellItemForm';
import ItemPage from '../pages/ItemPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import SendMessagePage from '../pages/SendMessagePage';
import EditProfilePage from '../pages/EditProfilePage';
import ProfilePage from '../pages/ProfilePage'
import SUHomePage from '../pages/SUhomePage';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PublicRoute path="/register" component={RegisterPage}/>
      <LoginRoute path="/login" component={LoginPage} exact={true}/>
      <PublicRoute path="/" component={HomePage} exact={true}/>
      <PrivateRoute path="/suhome" component={SUHomePage} exact={true}/>
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/message" component={SendMessagePage} exact={true}/>
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