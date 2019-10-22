import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
});

export type AppState = ReturnType<typeof rootReducer>;
