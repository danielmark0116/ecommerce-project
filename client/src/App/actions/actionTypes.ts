import { productData } from '../types/productData';

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

interface productsGetLatestActionType {
  type: typeof PRODUCTS_GET_LATEST;
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

export type ActionTypes =
  | productsCountActionType
  | productsGetAllActionType
  | productsGetCarouselActionType
  | productsGetLatestActionType
  | productsGetOneActionType
  | productsEditOneActionType
  | productsPublishOneActionType
  | productsDeleteOneActionType
  | productsGetAllLoadingActionType
  | productsGetAllSuccessActionType
  | productsGetAllFailActionType
  | productsGetOneLoadingActionType
  | productsGetOneSuccessActionType
  | productsGetOneFailActionType;
