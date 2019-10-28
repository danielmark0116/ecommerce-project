import { ActionTypes } from '../actions/actionTypes';
import * as types from '../actions/actionTypes';
import { requestData } from '../types/requestData';
import { orderData, orderShortData } from '../types/orderData';
import { AppState } from '.';

// SELECTOR
export const selectorOrderNewOrderId = (state: AppState): string => {
  return state.order.newOrderId;
};

export const selectorOrderNewOrderRequestData = (
  state: AppState
): requestData => {
  return state.order.newOrderRequestData;
};

export const selectorOrderGetOne = (state: AppState): orderData | null => {
  return state.order.singleOrder;
};

export const selectorOrderGetOneRequestData = (
  state: AppState
): requestData => {
  return state.order.singleOrderRequestData;
};

export const selectorOrderPaymentRedirect = (state: AppState): Boolean => {
  return state.order.paymentRedirect;
};

export const selectorOrderPaymentId = (state: AppState): string | null => {
  return state.order.paymentId;
};

interface initState {
  newOrderId: string;
  newOrderRequestData: requestData;
  singleOrder: orderData | null;
  singleOrderRequestData: requestData;
  userOrders: orderShortData[];
  userOrdersRequestData: requestData;
  paymentPending: Boolean;
  paymentSuccess: Boolean;
  paymentFail: Boolean;
  paymentId: string | null;
  paymentRedirect: Boolean;
}

const initState: initState = {
  newOrderId: '',
  newOrderRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  singleOrder: null,
  singleOrderRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  userOrders: [],
  userOrdersRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  paymentPending: false,
  paymentSuccess: false,
  paymentFail: false,
  paymentId: null,
  paymentRedirect: false
};

export function orderReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.PAYMENT_REDIRECT:
      return { ...state, paymentRedirect: true };
    case types.PAYMENT_ID:
      return { ...state, paymentId: action.payload };
    case types.ORDER_GET_ONE:
      return {
        ...state,
        singleOrder: action.payload,
        newOrderRequestData: initState.newOrderRequestData
      };
    case types.ORDER_GET_ONE_LOADING:
      return {
        ...state,
        singleOrderRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: 'Fetching order data'
        }
      };
    case types.ORDER_GET_ONE_SUCCESS:
      return {
        ...state,
        singleOrderRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: 'Successfully fetched order data'
        }
      };
    case types.ORDER_GET_ONE_FAIL:
      return {
        ...state,
        singleOrderRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    case types.ORDER_CREATE:
      return { ...state, newOrderId: action.payload };
    case types.ORDER_CREATE_LOADING:
      return {
        ...state,
        newOrderRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: 'Creating new order'
        }
      };
    case types.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        newOrderRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: 'Successfully created new order'
        }
      };
    case types.ORDER_CREATE_FAIL:
      return {
        ...state,
        newOrderRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    default:
      return { ...state };
  }
}
