import { combineReducers } from 'redux';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
  products: productReducer
});

export type AppState = ReturnType<typeof rootReducer>;
