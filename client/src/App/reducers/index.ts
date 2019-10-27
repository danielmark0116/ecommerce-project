import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { generalsReducer } from './generalsReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  generals: generalsReducer,
  auth: authReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;
