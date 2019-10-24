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
    userPic
  };
};

interface initState {
  userName: string;
  userOrders: string[];
  isAdmin: Boolean;
  isLoggedIn: Boolean;
  userPic: string;
  userEmail: string;
  authRequestData: requestData;
}

const initState: initState = {
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

export function authReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
