import { createStore, compose, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AppState } from '../reducers/index';
import { ActionTypes } from '../actions/actionTypes';

const middleware =
  process.env.REACT_APP_MODE === 'development'
    ? compose(
        applyMiddleware(thunk as ThunkMiddleware<AppState, ActionTypes>),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(thunk as ThunkMiddleware<AppState, ActionTypes>));

export const store = createStore(rootReducer, middleware);
