import { ActionTypes } from '../actions/actionTypes';
import * as types from '../actions/actionTypes';
import { userAddress } from '../types/userAddress';
import { requestData } from '../types/requestData';
import { AppState } from '.';

// SELECTOR
export const selectorUserAddresses = (state: AppState): userAddress[] => {
  return state.user.userAddresses;
};

export const selectorUserAddressesRequestData = (
  state: AppState
): requestData => {
  return state.user.userAddressesRequestData;
};

interface initState {
  userAddresses: userAddress[];
  userAddressesRequestData: requestData;
  userAddAddressRequestData: requestData;
}

const initState: initState = {
  userAddresses: [],
  userAddressesRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  userAddAddressRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  }
};

export function userReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.USER_GET_ADDRESSES:
      return { ...state, userAddresses: action.payload };
    case types.USER_ADD_ADDRESS:
      return { ...state, userAddresses: action.payload };
    case types.USER_ADD_ADDRESS_LOADING:
      return {
        ...state,
        userAddAddressRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: 'Adding new address'
        }
      };
    case types.USER_ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        userAddAddressRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: 'Successfully added new address'
        }
      };
    case types.USER_ADD_ADDRESS_FAIL:
      return {
        ...state,
        userAddAddressRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    case types.USER_GET_ADDRESSES_LOADING:
      return {
        ...state,
        userAddressesRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: 'Fetching user addresses'
        }
      };
    case types.USER_GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        userAddressesRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: 'Succesfully fetched user addresses'
        }
      };
    case types.USER_GET_ADDRESSES_FAIL:
      return {
        ...state,
        userAddressesRequestData: {
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
