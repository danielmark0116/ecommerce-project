import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageLayout from './App/layout/PageLayout';

import HomePage from './App/pages/HomePage/HomePage';
import ProductsPage from './App/pages/ProductsPage/ProductsPage';
import ProductPage from './App/pages/ProductPage/ProductPage';
import CartPage from './App/pages/CartPage/CartPage';

const PritaveRoutes = () => {
  return (
    <Switch>
      <Route exact path="/private">
        <h2>private route page</h2>
      </Route>
    </Switch>
  );
};

const Routes = () => {
  return (
    <PageLayout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/products">
          {true ? <ProductsPage /> : <Redirect to="/redirect"></Redirect>}
        </Route>
        <Route exact path="/products/:id">
          <ProductPage></ProductPage>
        </Route>
        <Route exact path="/cart">
          <CartPage></CartPage>
        </Route>
        <Route exact path="/login">
          <h2>you are not logged in page</h2>
        </Route>
        {true ? <PritaveRoutes /> : <Redirect to="/login"></Redirect>}
      </Switch>
    </PageLayout>
  );
};

export default Routes;
