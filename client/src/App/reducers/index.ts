import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { generalsReducer } from './generalsReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  generals: generalsReducer,
  auth: authReducer,
  user: userReducer,
  order: orderReducer
});

export type AppState = ReturnType<typeof rootReducer>;
