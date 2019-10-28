import { ActionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import * as types from './actionTypes';
import { updateToken } from '../helpers/fetchToken';
import axios from 'axios';
import { userAddress } from '../types/userAddress';
import { cartItemsType } from '../types/productCartData';
import { API_URL } from '../config';
import { clearCart } from '../helpers/cart';
import { cartGet, cartGetThunk } from './cartActions';
import { orderData } from '../types/orderData';

export const orderCreate = (payload: string): ActionTypes => ({
  type: types.ORDER_CREATE,
  payload
});

export const orderCreateLoading = (): ActionTypes => ({
  type: types.ORDER_CREATE_LOADING
});

export const orderCreateSuccess = (): ActionTypes => ({
  type: types.ORDER_CREATE_SUCCESS
});

export const orderCreateFail = (payload: string = ''): ActionTypes => ({
  type: types.ORDER_CREATE_FAIL,
  payload
});

export const orderGetOne = (payload: orderData): ActionTypes => ({
  type: types.ORDER_GET_ONE,
  payload
});

export const orderGetOneLoading = (): ActionTypes => ({
  type: types.ORDER_GET_ONE_LOADING
});

export const orderGetOneSuccess = (): ActionTypes => ({
  type: types.ORDER_GET_ONE_SUCCESS
});

export const orderGetOneFail = (payload: string): ActionTypes => ({
  type: types.ORDER_GET_ONE_FAIL,
  payload
});

export const paymentLoading = (): ActionTypes => ({
  type: types.PAYMENT_LOADING
});

export const paymentSuccess = (): ActionTypes => ({
  type: types.PAYMENT_SUCCESS
});

export const paymentFail = (): ActionTypes => ({
  type: types.PAYMENT_FAIL
});

export const paymentId = (payload: string): ActionTypes => ({
  type: types.PAYMENT_ID,
  payload
});

export const paymentRedirect = (): ActionTypes => ({
  type: types.PAYMENT_REDIRECT
});

// THUNKS
export const orderCreateThunk = (
  address: userAddress,
  deliveryType: string,
  deliveryValue: number,
  cart: cartItemsType,
  cartValue: number,
  discount: number,
  discountName: string,
  patronDiscount: number
) => {
  return async (dispatch: Dispatch<ActionTypes | any>) => {
    updateToken();
    dispatch(orderCreateLoading());

    const newOrder = {
      address,
      deliveryType,
      deliveryValue,
      cart,
      cartValue,
      discount,
      discountName,
      patronDiscount,
      totalValue: cartValue * discount * patronDiscount,
      status: 'init'
    };

    try {
      await new Promise((res, rej) => setTimeout(res, 1000));

      let response = await axios.post(`/order`, newOrder);

      let data = await response.data;

      dispatch(orderCreate(data.orders[0]._id));
      dispatch(orderCreateSuccess());
      dispatch(orderGetOneThunk(data.orders[0]._id));
      clearCart();
    } catch (e) {
      dispatch(orderCreateFail(e.message));
    }
  };
};

export const orderGetOneThunk = (id: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(orderGetOneLoading());
    updateToken();

    try {
      await new Promise((res, rej) => setTimeout(res, 1000));

      let response = await axios.get(`/order/${id}`);

      const data = await response.data;

      dispatch(orderGetOne(data.orders[0]));
      dispatch(orderGetOneSuccess());
    } catch (e) {
      dispatch(orderGetOneFail(e.message));
      console.log(e.message);
    }
  };
};

export const orderPaymentThunk = (orderId: string, amount: number) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    //

    try {
      let initPayRes = await axios.post('/stripe/startpayment', {
        orderId,
        amount
      });

      console.log(initPayRes);

      dispatch(paymentId(initPayRes.data.sessionId));
      dispatch(paymentRedirect());
    } catch (e) {
      console.log(e.message);
    }
  };
};
