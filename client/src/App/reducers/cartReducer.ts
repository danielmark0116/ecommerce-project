import { ActionTypes } from '../actions/actionTypes';
import * as types from '../actions/actionTypes';
import { cartItemsType } from '../types/productCartData';
import { requestData } from '../types/requestData';
import { AppState } from '.';

// SELECTORS
export const selectorCartGetAllItems = (state: AppState): cartItemsType => {
  return state.cart.cartProducts;
};

export const selectorCartRequestData = (state: AppState): requestData => {
  return state.cart.cartRequestData;
};

interface initState {
  cartProducts: cartItemsType;
  cartRequestData: requestData;
}

const initState: initState = {
  cartProducts: [],
  cartRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  }
};

export function cartReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.CART_GET_LOADING:
      return {
        ...state,
        cartRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: ''
        }
      };
    case types.CART_GET_SUCCESS:
      return {
        ...state,
        cartRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: ''
        }
      };
    case types.CART_GET_FAIL:
      return {
        ...state,
        cartRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    case types.CART_GET:
      return { ...state, cartProducts: action.payload };
    case types.CART_UPDATE:
      return {
        ...state,
        cartProducts: state.cartProducts.map(product => {
          if (product._id === action.payload.id) {
            return { ...product, quantity: action.payload.quantity };
          }
          return { ...product };
        })
      };
    case types.CART_DELETE_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          item => item._id !== action.payload
        )
      };
    default:
      return { ...state };
  }
}
