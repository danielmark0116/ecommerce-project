import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { productCartData } from '../types/productCartData';
import { Dispatch } from 'redux';
import axios from 'axios';
import { getCart } from '../helpers/cart';
import { cartData, cartDataElements } from '../types/cartData';

// ACTIONS
export const cartGet = (
  payload: (productCartData & cartDataElements | any)[]
): ActionTypes => ({
  type: types.CART_GET,
  payload
});

export const cartGetLoading = (): ActionTypes => ({
  type: types.CART_GET_LOADING
});

export const cartGetSuccess = (): ActionTypes => ({
  type: types.CART_GET_SUCCESS
});

export const cartGetFail = (payload: string = ''): ActionTypes => ({
  type: types.CART_GET_FAIL,
  payload
});

// THUNKS
export const cartGetThunk = (ids: string[]) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(cartGetLoading());

    try {
      let response = await axios.get(`/products/cart`, {
        params: {
          ids
        }
      });

      let products: productCartData[] = response.data.response;

      let cartData: cartDataElements[] = getCart();

      let finalCartData = products.map((item, index) => {
        const dataToMerge: any = cartData.find(
          cartItem => cartItem.id === item._id
        );

        return { ...item, quantity: dataToMerge.quantity };
      });

      dispatch(cartGet(finalCartData));
      dispatch(cartGetSuccess());
    } catch (e) {
      dispatch(cartGetFail(e.message));
    }
  };
};
