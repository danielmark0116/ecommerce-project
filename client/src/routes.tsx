import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageLayout from './App/layout/PageLayout';

import ProductsPage from './App/pages/ProductsPage/ProductsPage';

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
          <h2>home page</h2>
        </Route>
        <Route exact path="/products">
          {true ? <ProductsPage /> : <Redirect to="/redirect"></Redirect>}
        </Route>
        <Route exact path="/products/:id">
          <h2>one product details page</h2>
        </Route>
        <Route exact path="/cart">
          <h2>CART</h2>
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
