import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { generalsReducer } from './generalsReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  generals: generalsReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;
