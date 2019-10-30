import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './App/store/index';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App/styles/main.module.scss';
import { authCheckThunk } from './App/actions/authActions';

import { StripeProvider, Elements } from 'react-stripe-elements';

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <StripeProvider apiKey="pk_test_HBTW6la7zZutZIwh4zGKfTd000wGTdmhuf">
          <Elements>
            <Routes />
          </Elements>
        </StripeProvider>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

store.dispatch(authCheckThunk());

// store.dispatch(orderGetOneThunk('5db6ff64fe4b864d6a99a3aa'));
// store.dispatch(orderGetOneThunk('5db70065b9fb494de09e9217'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 5db6ff64fe4b864d6a99a3aa
