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
import EditItemPage from '../pages/EditItemPage';
import SUHomePage from '../pages/SUhomePage';
import Friend from '../pages/FriendPage';
import HomeSearchPage from '../pages/homeSearchPage';
import PurchaseIntention from '../pages/PurchaseIntention';
import UserInfoPage from '../pages/UserInfoPage';
import TransactionHistory from '../components/transactionPage/TransactionHistory';
import SellerApproveItemPage from '../pages/SellerApproveItemPage';
import CheckoutPage from '../pages/CheckoutPage.js';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PublicRoute path="/register" component={RegisterPage}/>
      <LoginRoute path="/login" component={LoginPage} exact={true}/>
      <PublicRoute path="/" component={HomePage} exact={true}/>
      <SuperRoute path="/suhome" component={SUHomePage}/>
      <PublicRoute path="/home/:keyword" component={HomeSearchPage}/>
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/sendMessage" component={SendMessagePage} exact={true}/>
      <PrivateRoute path="/checkMessage" component={CheckMessagePage }/>
      <PrivateRoute path="/friend" component={Friend}/>
      <PublicRoute path="/items/:id" component={ItemPage} exact={true}/>
      <PrivateRoute path="/editItem/:id" component={EditItemPage}/>
      <PrivateRoute path="/editProfile" component={EditProfilePage}/>
			<PrivateRoute path="/purchase-intention/new" component={PurchaseIntention} />
      <PrivateRoute path="/account" component={UserInfoPage}/>
      <PrivateRoute path="/transactionHistory" component={TransactionHistory}/>
      <PrivateRoute path="/sellerapprove/:orderid" component={SellerApproveItemPage}/>
			<PrivateRoute path="/checkout/:orderid" component={CheckoutPage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;