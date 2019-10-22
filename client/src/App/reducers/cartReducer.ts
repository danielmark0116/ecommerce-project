import { ActionTypes } from '../actions/actionTypes';
import * as types from '../actions/actionTypes';
import { productCartData } from '../types/productCartData';
import { cartData, cartDataElements } from '../types/cartData';
import { requestData } from '../types/requestData';

interface initState {
  cartProducts: (productCartData & cartDataElements | any)[];
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
    case types.CART_GET:
      return { ...state, cartProducts: action.payload };
    default:
      return { ...state };
  }
}
