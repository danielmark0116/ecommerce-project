import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { Dispatch } from 'redux';
import { providerUserData, userData } from '../types/userData';
import { async } from 'q';
import axios from 'axios';
import {
  saveToken,
  decodeToken,
  fetchToken,
  verifyToken,
  deleteToken
} from '../helpers/fetchToken';

// ACTIONS
export const authCheck = (payload: userData): ActionTypes => ({
  type: types.AUTH_CHECK,
  payload
});

export const authLogin = (payload: userData): ActionTypes => ({
  type: types.AUTH_LOGIN,
  payload
});

export const authLogout = (): ActionTypes => ({
  type: types.AUTH_LOGOUT
});

export const authLoading = (): ActionTypes => ({
  type: types.AUTH_LOADING
});

export const authSuccess = (payload: string = ''): ActionTypes => ({
  type: types.AUTH_SUCCESS,
  payload
});

export const authFail = (payload: string): ActionTypes => ({
  type: types.AUTH_FAIL,
  payload
});

// THUNKS
export const authCheckThunk = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(authLoading());

    const token = fetchToken();

    if (token && verifyToken(token)) {
      const decoded = decodeToken(token);

      dispatch(authCheck(decoded));

      dispatch(
        authSuccess(`User authenticated. Token is valid. User is now logged In`)
      );
    } else {
      dispatch(authFail('No token/invalid token'));
    }
  };
};

export const authLoginThunk = (
  provider: 'facebook' | 'google',
  userData: providerUserData
) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(authLoading());

    try {
      let response = await axios.post(`/auth/login/${provider}`, userData);

      let data = await response.data;

      const token = await response.data.authToken;

      if (data.success && token) {
        saveToken(token);
        dispatch(authLogin(decodeToken(token)));
        dispatch(
          authSuccess(
            `Logged in succesfully with ${provider}. User is Logged In`
          )
        );
      } else {
        dispatch(authFail('Auth not verified'));
      }
    } catch (e) {
      dispatch(authFail(e.message));
    }
  };
};

export const authLogOutThunk = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    deleteToken();
    dispatch(authLogout());
    dispatch(authFail('You have logged out'));
  };
};
