import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginRoute from './LoginRoute';
import SuperRoute from './SuperRoute';
import sellingForm from '../pages/sellItemForm';
import ItemPage from '../pages/ItemPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import SendMessagePage from '../pages/sendMessagePage';
import CheckMessagePage from '../pages/checkMessagePage';
import EditProfilePage from '../pages/EditProfilePage';
import ProfilePage from '../pages/ProfilePage';
import SUHomePage from '../pages/SUhomePage';
import PurchaseIntention from '../pages/PurchaseIntention';
import UserInfoPage from '../pages/UserInfoPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PublicRoute path="/register" component={RegisterPage}/>
      <LoginRoute path="/login" component={LoginPage} exact={true}/>
      <PublicRoute path="/" component={HomePage} exact={true}/>
      <SuperRoute path="/suhome" component={SUHomePage}/>
      {/*<PrivateRoute path="/suhome" component={SUHomePage}/>*/}
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/message" component={SendMessagePage} exact={true}/>
      <PrivateRoute path="/checkmessage" component={CheckMessagePage }/>
      <PublicRoute path="/items/:id" component={ItemPage} exact={true}/>
      <PrivateRoute path="/editProfile" component={EditProfilePage}/>
      <PrivateRoute path="/profile" component={ProfilePage}/>
			<PrivateRoute path="/purchase-intention/new" component={PurchaseIntention} />
      <PrivateRoute path="/account" component={UserInfoPage}/>

      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;