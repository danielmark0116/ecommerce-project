import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageLayout from './App/layout/PageLayout';

import Loader from './App/common/Loader/Loader';

import HomePage from './App/pages/HomePage/HomePage';
import ProductsPage from './App/pages/ProductsPage/ProductsPage';
import ProductPage from './App/pages/ProductPage/ProductPage';
import CartPage from './App/pages/CartPage/CartPage';
import CheckoutPage from './App/pages/CheckoutPage/CheckoutPage';
import NewOrderPage from './App/pages/NewOrder/NewOrgerPage';
import ProfilePage from './App/pages/ProfilePage/ProfilePage';
import FullfillPaymentPage from './App/pages/FullfillPaymentPage/FullfillPaymentPage';
import OrderPage from './App/pages/OrderPage/OrderPage';

import { AppState } from './App/reducers';
import {
  selectorAuthIsLoggedIn,
  selectorAuthRequestData
} from './App/reducers/authReducer';
import { requestData } from './App/types/requestData';

const Routes = (props: stateToProps) => {
  const { isLoggedIn } = props;
  const { pending, error, success } = props.authRequestData;

  const PritaveRoute = (child: () => JSX.Element) => {
    if (isLoggedIn && !pending && success) return child;
    if (!isLoggedIn && error && !success && !pending)
      return <Redirect push to="/login"></Redirect>;
    if (pending || (!error && !pending && !success)) return <Loader></Loader>;
  };

  return (
    <PageLayout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/products">
          <ProductsPage />
        </Route>
        <Route exact path="/products/:id">
          <ProductPage></ProductPage>
        </Route>
        <Route exact path="/cart">
          <CartPage></CartPage>
        </Route>
        <Route exact path="/checkout">
          {PritaveRoute(CheckoutPage)}
        </Route>
        <Route exact path="/new-order-success">
          {PritaveRoute(NewOrderPage)}
        </Route>
        <Route exact path="/payment-success/:paymentSessionId">
          <FullfillPaymentPage />
        </Route>
        <Route exact path="/order/:orderId">
          {PritaveRoute(OrderPage)}
        </Route>
        <Route exact path="/profile">
          {PritaveRoute(ProfilePage)}
        </Route>
        <Route exact path="/login">
          <h2>you are not logged in page</h2>
        </Route>
      </Switch>
    </PageLayout>
  );
};

interface stateToProps {
  isLoggedIn: Boolean;
  authRequestData: requestData;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state),
  authRequestData: selectorAuthRequestData(state)
});

export default connect(mapStateToProps)(Routes);
