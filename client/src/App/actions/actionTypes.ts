import { productData } from '../types/productData';
import { productCartData } from '../types/productCartData';
import { cartDataElements } from '../types/cartData';
import { userData } from '../types/userData';
import { userAddress } from '../types/userAddress';
import { orderData } from '../types/orderData';

// PRODUCTS
export const PRODUCTS_COUNT = 'PRODUCTS_COUNT';
export const PRODUCTS_GET_ALL = 'PRODUCTS_GET_ALL';
export const PRODUCTS_GET_ONE = 'PRODUCTS_GET_ONE';
export const PRODUCTS_EDIT_ONE = 'PRODUCTS_EDIT_ONE';
export const PRODUCTS_PUBLISH_ONE = 'PRODUCTS_PUBLISH_ONE';
export const PRODUCTS_DELETE_ONE = 'PRODUCTS_DELETE_ONE';
export const PRODUCTS_GET_ALL_LOADING = 'PRODUCTS_GET_ALL_LOADING';
export const PRODUCTS_GET_ALL_SUCCESS = 'PRODUCTS_GET_ALL_SUCCESS';
export const PRODUCTS_GET_ALL_FAIL = 'PRODUCTS_GET_ALL_FAIL';
export const PRODUCTS_GET_ONE_LOADING = 'PRODUCTS_GET_ONE_LOADING';
export const PRODUCTS_GET_ONE_SUCCESS = 'PRODUCTS_GET_ONE_SUCCESS';
export const PRODUCTS_GET_ONE_FAIL = 'PRODUCTS_GET_ONE_FAIL';

export const PRODUCTS_GET_CAROUSEL = 'PRODUCTS_GET_CAROUSEL';
export const PRODUCTS_GET_LATEST = 'PRODUCTS_GET_LATEST';
export const PRODUCTS_GET_BESTSELLERS = 'PRODUCTS_GET_BESTSELLERS';
export const PRODUCTS_GET_SIMILAR = 'PRODUCTS_GET_SIMILAR';

interface productsCountActionType {
  type: typeof PRODUCTS_COUNT;
  payload: number;
}

interface productsGetAllActionType {
  type: typeof PRODUCTS_GET_ALL;
  payload: productData[];
}

interface productsGetCarouselActionType {
  type: typeof PRODUCTS_GET_CAROUSEL;
  payload: productData[];
}

interface productsGetBestSellersActionType {
  type: typeof PRODUCTS_GET_BESTSELLERS;
  payload: productData[];
}

interface productsGetLatestActionType {
  type: typeof PRODUCTS_GET_LATEST;
  payload: productData[];
}

interface productsGetSimilarActionType {
  type: typeof PRODUCTS_GET_SIMILAR;
  payload: productData[];
}

interface productsGetOneActionType {
  type: typeof PRODUCTS_GET_ONE;
  payload: productData;
}

interface productsEditOneActionType {
  type: typeof PRODUCTS_EDIT_ONE;
  payload: productData;
}

interface productsPublishOneActionType {
  type: typeof PRODUCTS_PUBLISH_ONE;
  payload: string;
}

interface productsDeleteOneActionType {
  type: typeof PRODUCTS_DELETE_ONE;
  payload: string;
}

interface productsGetAllLoadingActionType {
  type: typeof PRODUCTS_GET_ALL_LOADING;
}

interface productsGetAllSuccessActionType {
  type: typeof PRODUCTS_GET_ALL_SUCCESS;
}

interface productsGetAllFailActionType {
  type: typeof PRODUCTS_GET_ALL_FAIL;
  payload: string;
}

interface productsGetOneLoadingActionType {
  type: typeof PRODUCTS_GET_ONE_LOADING;
}

interface productsGetOneSuccessActionType {
  type: typeof PRODUCTS_GET_ONE_SUCCESS;
}

interface productsGetOneFailActionType {
  type: typeof PRODUCTS_GET_ONE_FAIL;
  payload: string;
}

// CART
export const CART_GET = 'CART_GET';
export const CART_UPDATE = 'CART_UPDATE';
export const CART_DELETE_ITEM = 'CART_DELETE_ITEM';
export const CART_GET_LOADING = 'CART_GET_LOADING';
export const CART_GET_SUCCESS = 'CART_GET_SUCCESS';
export const CART_GET_FAIL = 'CART_GET_FAIL';
export const CART_CLEAR = 'CART_CLEAR';

interface cartGetActionType {
  type: typeof CART_GET;
  payload: (productCartData & cartDataElements | any)[];
}

interface cartUpdateActionType {
  type: typeof CART_UPDATE;
  payload: {
    id: string;
    quantity: any;
  };
}

interface cartDeleteItemActionType {
  type: typeof CART_DELETE_ITEM;
  id: string;
  size: string;
}

interface cartGetLoadingActionType {
  type: typeof CART_GET_LOADING;
}

interface cartGetSuccessActionType {
  type: typeof CART_GET_SUCCESS;
}

interface cartGetFailActionType {
  type: typeof CART_GET_FAIL;
  payload: string;
}

interface cartClearActionType {
  type: typeof CART_CLEAR;
}

// AUTH
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

interface authCheckActionType {
  type: typeof AUTH_CHECK;
  payload: userData;
}

interface authLoginActionType {
  type: typeof AUTH_LOGIN;
  payload: userData;
}

interface authLogoutActionType {
  type: typeof AUTH_LOGOUT;
}

interface authLoadingActionType {
  type: typeof AUTH_LOADING;
}

interface authSuccessActionType {
  type: typeof AUTH_SUCCESS;
  payload: string;
}

interface authFailActionType {
  type: typeof AUTH_FAIL;
  payload: string;
}

// USER DATA
export const USER_GET_ADDRESSES = 'USER_GET_ADDRESSES';
export const USER_GET_ADDRESSES_LOADING = 'USER_GET_ADDRESSES_LOADING';
export const USER_GET_ADDRESSES_SUCCESS = 'USER_GET_ADDRESSES_SUCCESS';
export const USER_GET_ADDRESSES_FAIL = 'USER_GET_ADDRESSES_FAIL';

export const USER_ADD_ADDRESS = 'USER_ADD_ADDRESS';
export const USER_ADD_ADDRESS_LOADING = 'USER_ADD_ADDRESS_LOADING';
export const USER_ADD_ADDRESS_SUCCESS = 'USER_ADD_ADDRESS_SUCCESS';
export const USER_ADD_ADDRESS_FAIL = 'USER_ADD_ADDRESS_FAIL';

interface userGetAddressesActionType {
  type: typeof USER_GET_ADDRESSES;
  payload: userAddress[];
}

interface userGetAddressesLoadingActionType {
  type: typeof USER_GET_ADDRESSES_LOADING;
}

interface userGetAddressesSuccessActionType {
  type: typeof USER_GET_ADDRESSES_SUCCESS;
}

interface userGetAddressesFailActionType {
  type: typeof USER_GET_ADDRESSES_FAIL;
  payload: string;
}

interface userAddAddressActionType {
  type: typeof USER_ADD_ADDRESS;
  payload: userAddress[];
}

interface userAddAddressLoadingActionType {
  type: typeof USER_ADD_ADDRESS_LOADING;
}

interface userAddAddressSuccessActionType {
  type: typeof USER_ADD_ADDRESS_SUCCESS;
}

interface userAddAddressFailActionType {
  type: typeof USER_ADD_ADDRESS_FAIL;
  payload: string;
}

// ORDER ACTIONS
export const ORDER_CREATE = 'ORDER_CREATE';
export const ORDER_CREATE_LOADING = 'ORDER_CREATE_LOADING';
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

export const ORDER_GET_ONE = 'ORDER_GET_ONE';
export const ORDER_GET_ONE_LOADING = 'ORDER_GET_ONE_LOADING';
export const ORDER_GET_ONE_SUCCESS = 'ORDER_GET_ONE_SUCCESS';
export const ORDER_GET_ONE_FAIL = 'ORDER_GET_ONE_FAIL';

export const ORDER_GET_ALL_USERS = 'ORDER_GET_ALL_USERS';
export const ORDER_GET_ALL_USERS_LOADING = 'ORDER_GET_ALL_USERS_LOADING';
export const ORDER_GET_ALL_USERS_SUCCESS = 'ORDER_GET_ALL_USERS_SUCCESS';
export const ORDER_GET_ALL_USERS_FAIL = 'ORDER_GET_ALL_USERS_FAIL';

export const ORDER_GET_ACTIVE_Q = 'ORDER_GET_ACTIVE_Q';

export const PAYMENT_LOADING = 'PAYMENT_LOADING';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAIL = 'PAYMENT_FAIL';
export const PAYMENT_ID = 'PAYMENT_ID';
export const PAYMENT_REDIRECT = 'PAYMENT_REDIRECT';

interface orderCreateActionType {
  type: typeof ORDER_CREATE;
  payload: string;
}

interface orderCreateLoadingActionType {
  type: typeof ORDER_CREATE_LOADING;
}

interface orderCreateSuccessActionType {
  type: typeof ORDER_CREATE_SUCCESS;
}

interface orderCreateFailActionType {
  type: typeof ORDER_CREATE_FAIL;
  payload: string;
}

interface orderGetOneActionType {
  type: typeof ORDER_GET_ONE;
  payload: orderData;
}

interface orderGetOneLoadingActionType {
  type: typeof ORDER_GET_ONE_LOADING;
}

interface orderGetOneSuccessActionType {
  type: typeof ORDER_GET_ONE_SUCCESS;
}

interface orderGetOneFailActionType {
  type: typeof ORDER_GET_ONE_FAIL;
  payload: string;
}

interface orderGetAllUsersActionType {
  type: typeof ORDER_GET_ALL_USERS;
  payload: orderData[];
}

interface orderGetAllUsersLoadingActionType {
  type: typeof ORDER_GET_ALL_USERS_LOADING;
}

interface orderGetAllUsersSuccessActionType {
  type: typeof ORDER_GET_ALL_USERS_SUCCESS;
}

interface orderGetAllUsersFailActionType {
  type: typeof ORDER_GET_ALL_USERS_FAIL;
  payload: string;
}

interface orderGetAllUsersActiveOrdersQActionType {
  type: typeof ORDER_GET_ACTIVE_Q;
  payload: number | null;
}

interface paymentLoadingActionType {
  type: typeof PAYMENT_LOADING;
}

interface paymentSuccessActionType {
  type: typeof PAYMENT_SUCCESS;
}

interface paymentFailActionType {
  type: typeof PAYMENT_FAIL;
}

interface paymentIdActionType {
  type: typeof PAYMENT_ID;
  payload: string;
}

interface paymentRedirectActionType {
  type: typeof PAYMENT_REDIRECT;
}

export type ActionTypes =
  | productsCountActionType
  | productsGetAllActionType
  | productsGetCarouselActionType
  | productsGetBestSellersActionType
  | productsGetLatestActionType
  | productsGetSimilarActionType
  | productsGetOneActionType
  | productsEditOneActionType
  | productsPublishOneActionType
  | productsDeleteOneActionType
  | productsGetAllLoadingActionType
  | productsGetAllSuccessActionType
  | productsGetAllFailActionType
  | productsGetOneLoadingActionType
  | productsGetOneSuccessActionType
  | productsGetOneFailActionType
  | cartGetActionType
  | cartUpdateActionType
  | cartDeleteItemActionType
  | cartGetLoadingActionType
  | cartGetSuccessActionType
  | cartGetFailActionType
  | cartClearActionType
  | authCheckActionType
  | authLoginActionType
  | authLogoutActionType
  | authLoadingActionType
  | authSuccessActionType
  | authFailActionType
  | userGetAddressesActionType
  | userGetAddressesLoadingActionType
  | userGetAddressesSuccessActionType
  | userGetAddressesFailActionType
  | userAddAddressActionType
  | userAddAddressLoadingActionType
  | userAddAddressSuccessActionType
  | userAddAddressFailActionType
  | orderCreateActionType
  | orderCreateLoadingActionType
  | orderCreateSuccessActionType
  | orderCreateFailActionType
  | orderGetOneActionType
  | orderGetOneLoadingActionType
  | orderGetOneSuccessActionType
  | orderGetOneFailActionType
  | orderGetAllUsersActionType
  | orderGetAllUsersLoadingActionType
  | orderGetAllUsersSuccessActionType
  | orderGetAllUsersFailActionType
  | orderGetAllUsersActiveOrdersQActionType
  | paymentLoadingActionType
  | paymentSuccessActionType
  | paymentFailActionType
  | paymentIdActionType
  | paymentRedirectActionType;
