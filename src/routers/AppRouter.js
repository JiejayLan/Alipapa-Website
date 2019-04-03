import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import sellingForm from '../components/sellItemForm';
<<<<<<< HEAD
import ItemPage from '../components/ItemPage';
=======
>>>>>>> 9807621bd029a2bbc54fa5531729615125950392
import RegisterPage from '../components/RegisterPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PrivateRoute path="/register" component={RegisterPage}/>
      <PublicRoute path="/" component={LoginPage} exact={true}/>
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
	  <PrivateRoute path="/items/:id" component={ItemPage} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;