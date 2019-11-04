import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { userAddress } from '../types/userAddress';
import { Dispatch } from 'redux';
import axios from 'axios';
import { updateToken } from '../helpers/fetchToken';

import { notify } from '../features/Notification/Notification';

// ACTIONS
export const userGetAddresses = (payload: userAddress[]): ActionTypes => ({
  type: types.USER_GET_ADDRESSES,
  payload
});

export const userGetAddressesLoading = (): ActionTypes => ({
  type: types.USER_GET_ADDRESSES_LOADING
});

export const userGetAddressesSuccess = (): ActionTypes => ({
  type: types.USER_GET_ADDRESSES_SUCCESS
});

export const userGetAddressesFail = (payload: string = ''): ActionTypes => ({
  type: types.USER_GET_ADDRESSES_FAIL,
  payload
});

export const userAddAddress = (payload: userAddress[]): ActionTypes => ({
  type: types.USER_ADD_ADDRESS,
  payload
});

export const userAddAddressLoading = (): ActionTypes => ({
  type: types.USER_ADD_ADDRESS_LOADING
});

export const userAddAddressSuccess = (): ActionTypes => ({
  type: types.USER_ADD_ADDRESS_SUCCESS
});

export const userAddAddressFail = (payload: string = ''): ActionTypes => ({
  type: types.USER_ADD_ADDRESS_FAIL,
  payload
});

// THUNKS
export const userGetAddressesThunk = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(userGetAddressesLoading());
    updateToken();

    try {
      let response = await axios.get('/api/user/address');

      const data = await response.data;

      let userAddresses = data.userAddresses;

      dispatch(userGetAddresses(userAddresses));
      dispatch(userGetAddressesSuccess());
    } catch (e) {
      dispatch(userGetAddressesFail(e.message));
    }
  };
};

export const userAddAddressThunk = (userAddress: userAddress) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(userAddAddressLoading());
    updateToken();

    try {
      let response = await axios.post('/api/user/address', userAddress);

      const data = await response.data;

      let userAddresses = data.userAddresses;

      dispatch(userAddAddress(userAddresses));
      dispatch(userAddAddressSuccess());
      notify('Successfully added new address', 5000);
    } catch (e) {
      dispatch(userAddAddressFail(e.message));
    }
  };
};
