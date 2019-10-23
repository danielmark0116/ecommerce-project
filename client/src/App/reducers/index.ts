import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { generalsReducer } from './generalsReducer';

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  generals: generalsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
