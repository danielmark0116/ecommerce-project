import { ActionTypes } from './actionTypes';
import { Dispatch } from 'redux';
import * as types from './actionTypes';
import { updateToken } from '../helpers/fetchToken';
import axios from 'axios';
import { userAddress } from '../types/userAddress';
import { cartItemsType } from '../types/productCartData';
import { clearCart } from '../helpers/cart';
import { cartGet, cartGetThunk } from './cartActions';
import { orderData } from '../types/orderData';
import { notify } from '../features/Notification/Notification';
import { deleteCouponDataFromSession } from '../helpers/couponSessionStorage';
import _ from 'lodash';

export const orderGetAllUsers = (payload: orderData[]): ActionTypes => ({
  type: types.ORDER_GET_ALL_USERS,
  payload
});

export const orderGetAllUsersLoading = (): ActionTypes => ({
  type: types.ORDER_GET_ALL_USERS_LOADING
});

export const orderGetAllUsersSuccess = (): ActionTypes => ({
  type: types.ORDER_GET_ALL_USERS_SUCCESS
});

export const orderGetAllUsersFail = (payload: string): ActionTypes => ({
  type: types.ORDER_GET_ALL_USERS_FAIL,
  payload
});

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

export const orderGetAllUsersActiveQ = (
  payload: number | null
): ActionTypes => ({
  type: types.ORDER_GET_ACTIVE_Q,
  payload
});

export const orderGetAllUsersQ = (payload: number): ActionTypes => ({
  type: types.ORDER_GET_ALL_Q,
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
      totalValue: _.round(cartValue * discount * patronDiscount, 2)
    };

    try {
      let response = await axios.post(`/api/order`, newOrder);

      let data = await response.data;

      dispatch(orderCreate(data.orders[0]._id));
      dispatch(orderCreateSuccess());
      dispatch(orderGetOneThunk(data.orders[0]._id));
      clearCart();
      dispatch(orderGetUsersActiveOrdersQuantityThunk());
    } catch (e) {
      dispatch(orderCreateFail(e.message));
    }
  };
};

export const orderGetAllUsersThunk = (skip: number = 0, limit: number = 1) => {
  return async (dispatch: Dispatch<ActionTypes | any>) => {
    updateToken();
    dispatch(orderGetAllUsersLoading());

    try {
      // let response = await axios.get('/api/order');
      let response = await axios.get(`/api/order/${skip}/${limit}`);

      let data = await response.data;

      let ordersQuantity = data.ordersQuantity;

      dispatch(orderGetAllUsers(data.response));
      dispatch(orderGetAllUsersSuccess());
      dispatch(orderGetUsersActiveOrdersQuantityThunk());
      dispatch(orderGetAllUsersQ(ordersQuantity));
    } catch (e) {
      dispatch(orderGetAllUsersFail(e.message));
    }
  };
};

export const orderGetOneThunk = (id: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(orderGetOneLoading());
    updateToken();

    try {
      let response = await axios.get(`/api/order/${id}`);

      const data = await response.data;

      dispatch(orderGetOne(data.orders[0]));
      dispatch(orderGetOneSuccess());
    } catch (e) {
      dispatch(orderGetOneFail(e.message));
    }
  };
};

export const orderGetUsersActiveOrdersQuantityThunk = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    updateToken();

    try {
      let activeOrders = await axios.get(`/api/order/activeOrdersNumber`);

      let data = await activeOrders.data;

      dispatch(orderGetAllUsersActiveQ(data.response));
    } catch (e) {
      dispatch(orderGetAllUsersActiveQ(null));
    }
  };
};

export const orderPaymentThunk = (orderId: string, amount: number) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(paymentLoading());
    deleteCouponDataFromSession();

    try {
      let initPayRes = await axios.post('/api/stripe/startpayment', {
        orderId,
        amount
      });

      dispatch(paymentId(initPayRes.data.sessionId));
      dispatch(paymentRedirect());
    } catch (e) {
      dispatch(paymentFail());
    }
  };
};

export const orderPaymentFullFillThunk = (sessionId: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    updateToken();
    deleteCouponDataFromSession();

    try {
      let initPayRes = await axios.post('/api/stripe/fullfillpayment', {
        sessionId
      });

      notify('Order was succesfully paid', 5000);
      dispatch(paymentSuccess());
    } catch (e) {
      dispatch(paymentFail());
    }
  };
};
