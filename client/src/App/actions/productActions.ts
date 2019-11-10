import { ActionTypes } from './actionTypes';
import * as types from './actionTypes';
import { productData } from '../types/productData';
import axios from 'axios';
import { Dispatch } from 'redux';

// ACTIONS
export const productsCount = (payload: number): ActionTypes => ({
  type: types.PRODUCTS_COUNT,
  payload
});

export const productsGetAll = (payload: productData[]): ActionTypes => ({
  type: types.PRODUCTS_GET_ALL,
  payload
});

export const productsGetCarousel = (payload: productData[]): ActionTypes => ({
  type: types.PRODUCTS_GET_CAROUSEL,
  payload
});

export const productsGetSimilar = (payload: productData[]): ActionTypes => ({
  type: types.PRODUCTS_GET_SIMILAR,
  payload
});

export const productsGetBestsellers = (
  payload: productData[]
): ActionTypes => ({
  type: types.PRODUCTS_GET_BESTSELLERS,
  payload
});

export const productsGetLatest = (payload: productData[]): ActionTypes => ({
  type: types.PRODUCTS_GET_LATEST,
  payload
});

export const productsGetOne = (payload: productData): ActionTypes => ({
  type: types.PRODUCTS_GET_ONE,
  payload
});

export const productsEditOne = (payload: productData): ActionTypes => ({
  type: types.PRODUCTS_EDIT_ONE,
  payload
});

export const productsPublishOne = (productId: string): ActionTypes => ({
  type: types.PRODUCTS_PUBLISH_ONE,
  payload: productId
});

export const productsDeleteOne = (productId: string): ActionTypes => ({
  type: types.PRODUCTS_DELETE_ONE,
  payload: productId
});

export const productsGetAllLoading = (): ActionTypes => ({
  type: types.PRODUCTS_GET_ALL_LOADING
});

export const productsGetAllSuccess = (): ActionTypes => ({
  type: types.PRODUCTS_GET_ALL_SUCCESS
});

export const productsGetAllFail = (payload: string = ''): ActionTypes => ({
  type: types.PRODUCTS_GET_ALL_FAIL,
  payload
});

export const productsGetOneLoading = (): ActionTypes => ({
  type: types.PRODUCTS_GET_ONE_LOADING
});

export const productsGetOneSuccess = (): ActionTypes => ({
  type: types.PRODUCTS_GET_ONE_SUCCESS
});

export const productsGetOneFail = (payload: string = ''): ActionTypes => ({
  type: types.PRODUCTS_GET_ONE_FAIL,
  payload
});

// THUNKS
export const productsGetAllThunk = (
  fetchAll: Boolean,
  skip: number = 0,
  limit: number = 0,
  filter: string = '',
  productsType:
    | 'products'
    | 'latest'
    | 'carousel'
    | 'bestsellers'
    | 'similar' = 'products'
) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(productsGetAllLoading());

    try {
      let response = await axios.get(
        `/api/products${
          fetchAll ? '/all/' : '/'
        }${skip}/${limit}/filter?${filter}`
      );

      let products = response.data.response;
      let productsQ = response.data.quantity;

      dispatch(productsCount(productsQ));
      productsType === 'products' && dispatch(productsGetAll(products));
      productsType === 'latest' && dispatch(productsGetLatest(products));
      productsType === 'carousel' && dispatch(productsGetCarousel(products));
      productsType === 'similar' && dispatch(productsGetSimilar(products));
      productsType === 'bestsellers' &&
        dispatch(productsGetBestsellers(products));
      dispatch(productsGetAllSuccess());
    } catch (e) {
      dispatch(productsGetAllFail(e.message));
    }
  };
};

export const productsGetByIdThunk = (id: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(productsGetOneLoading());

    try {
      let response = await axios.get(`/api/products/${id}`);
      let product = response.data.response[0];

      dispatch(productsGetOne(product));
      dispatch(productsGetOneSuccess());
    } catch (e) {
      dispatch(productsGetOneFail(e.message));
    }
  };
};
