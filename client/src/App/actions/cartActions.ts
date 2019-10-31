import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { productCartData } from '../types/productCartData';
import { Dispatch } from 'redux';
import axios from 'axios';
import { getCart, saveToLocalStore } from '../helpers/cart';
import { cartData, cartDataElements } from '../types/cartData';
import _ from 'lodash';

// ACTIONS
export const cartGet = (
  payload: (productCartData & cartDataElements | any)[]
): ActionTypes => ({
  type: types.CART_GET,
  payload
});

export const cartUpdate = (id: string, quantity: any): ActionTypes => ({
  type: types.CART_UPDATE,
  payload: {
    id,
    quantity
  }
});

export const cartDeleteItem = (payload: string): ActionTypes => ({
  type: types.CART_DELETE_ITEM,
  payload
});

export const cartClearAction = (): ActionTypes => ({
  type: types.CART_CLEAR
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
      await new Promise((res, rej) => setTimeout(res, 500));

      let response = await axios.get(`/api/products/cart`, {
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

export const cartUpdateThunk = (id: string, size: string, quantity: number) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      let cartData: cartDataElements[] = getCart();

      let itemToUpdate = _.filter(cartData, { id });

      let updatedQ = {
        ..._.map(itemToUpdate, 'quantity')[0],
        [size]: quantity
      };

      dispatch(cartUpdate(id, updatedQ));

      localStorage.setItem(
        'cart',
        JSON.stringify(
          cartData.map(item => {
            if (item.id === id) return { ...item, quantity: updatedQ };
            return { ...item };
          })
        )
      );
    } catch (e) {
      //
    }
  };
};

export const cartDeleteItemThunk = (id: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      let cartData: cartDataElements[] = getCart();

      dispatch(cartDeleteItem(id));

      localStorage.setItem(
        'cart',
        JSON.stringify(cartData.filter(item => item.id !== id))
      );
    } catch (e) {
      //
    }
  };
};
