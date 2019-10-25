import { ActionTypes } from '../actions/actionTypes';
import * as types from '../actions/actionTypes';
import { requestData } from '../types/requestData';
import { AppState } from '.';
import { userData } from '../types/userData';

export const selectorAuthIsLoggedIn = (state: AppState): Boolean => {
  return state.auth.isLoggedIn;
};

export const selectorAuthIsAdmin = (state: AppState): Boolean => {
  return state.auth.isAdmin;
};

export const selectorAuthRequestData = (state: AppState): requestData => {
  return state.auth.authRequestData;
};

export const selectorAuthUserData = (state: AppState): userData => {
  const {
    userName,
    userOrders,
    userAddresses,
    isAdmin,
    isLoggedIn,
    userPic,
    userEmail
  } = state.auth;

  return {
    userName,
    userEmail,
    userOrders,
    isAdmin,
    isLoggedIn,
    userPic,
    userAddresses
  };
};

interface initState {
  userName: string;
  userOrders: string[];
  userAddresses: any[];
  isAdmin: Boolean;
  isLoggedIn: Boolean;
  userPic: string;
  userEmail: string;
  authRequestData: requestData;
}

const initState: initState = {
  userName: '',
  userOrders: [],
  userAddresses: [],
  isAdmin: false,
  isLoggedIn: false,
  userPic: '',
  userEmail: '',
  authRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  }
};

export function authReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.AUTH_CHECK:
      return {
        ...state,
        userName: action.payload.userName,
        userOrders: action.payload.userOrders,
        isAdmin: action.payload.isAdmin,
        isLoggedIn: action.payload.isLoggedIn,
        userPic: action.payload.userPic,
        userEmail: action.payload.userEmail
      };
    case types.AUTH_LOGIN:
      return {
        ...state,
        userName: action.payload.userName,
        userOrders: action.payload.userOrders,
        isAdmin: action.payload.isAdmin,
        isLoggedIn: action.payload.isLoggedIn,
        userPic: action.payload.userPic,
        userEmail: action.payload.userEmail
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        userName: '',
        userOrders: [],
        isAdmin: false,
        isLoggedIn: false,
        userPic: '',
        userEmail: '',
        authRequestData: {
          pending: false,
          success: false,
          error: false,
          msg: ''
        }
      };
    case types.AUTH_LOADING:
      return {
        ...state,
        authRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: 'Pending authentication, please wait...'
        }
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        authRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: action.payload
        }
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        isAdmin: false,
        isLoggedIn: false,
        authRequestData: {
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
