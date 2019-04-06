import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';
import sellingForm from '../components/sellItemForm';
import ItemPage from '../components/ItemPage';
import HomePage from '../components/HomePage';
import RegisterPage from '../components/RegisterPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PrivateRoute path="/register" component={RegisterPage}/>
      <LoginRoute path="/" component={LoginPage} exact={true}/>
      <Route path="/home" component={HomePage} exact={true}/>
      <Route path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
	    <PrivateRoute path="/items/:id" component={ItemPage} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;