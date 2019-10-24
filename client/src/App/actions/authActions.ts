import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { Dispatch } from 'redux';
import { providerUserData } from '../types/userData';
import { async } from 'q';
import axios from 'axios';
import { saveToken } from '../helpers/fetchToken';

// ACTIONS
export const authCheck = (payload: {
  isLoggedIn: Boolean;
  isAdmin: Boolean;
}): ActionTypes => ({
  type: types.AUTH_CHECK,
  payload
});

export const authLogin = (payload: {
  isLoggedIn: Boolean;
  isAdmin: Boolean;
}): ActionTypes => ({
  type: types.AUTH_LOGIN,
  payload
});

export const authLogout = (): ActionTypes => ({
  type: types.AUTH_LOGOUT
});

export const authLoading = (): ActionTypes => ({
  type: types.AUTH_LOADING
});

export const authSuccess = (): ActionTypes => ({
  type: types.AUTH_SUCCESS
});

export const authFail = (payload: string): ActionTypes => ({
  type: types.AUTH_FAIL,
  payload
});

// THUNKS
export const authCheckThunk = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(authLoading());

    try {
      //
    } catch {
      //
    }
  };
};

export const authLoginThunk = (
  provider: 'facebook' | 'google',
  userData: providerUserData
) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(authLoading());
    //  /auth/login/:proder

    try {
      let response = await axios.post(`/auth/login/${provider}`, userData);

      const token = await response.data.token;

      saveToken(token);

      console.log(response.data);
    } catch (e) {
      dispatch(authFail(e.message));
    }
  };
};
