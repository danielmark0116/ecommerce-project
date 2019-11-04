import * as types from '../actions/actionTypes';
import { ActionTypes } from '../actions/actionTypes';
import { productData, productDataElements } from '../types/productData';
import { AppState } from '.';
import { requestData } from '../types/requestData';

// SELECTORS
export const selectorProductsGetAll = (state: AppState): productData[] => {
  return state.products.products;
};

export const selectorProductsGetOne = (state: AppState): productData | null => {
  return state.products.singleProduct ? state.products.singleProduct : null;
};

export const selectorProductsGetLatest = (state: AppState): productData[] => {
  return state.products.latestProducts;
};

export const selectorProductsGetCarousel = (state: AppState): productData[] => {
  return state.products.carouselProducts;
};

export const selectorProductsGetSimilar = (state: AppState): productData[] => {
  return state.products.similarProducts;
};

export const selectorProductsGetBestsellers = (
  state: AppState
): productData[] => {
  return state.products.bestsellers;
};

export const selectorProductsRequestData = (state: AppState): requestData => {
  return state.products.productsRequestData;
};

export const selectorSingleProductRequestData = (
  state: AppState
): requestData => {
  return state.products.singleProductRequestData;
};

export const selectorProductsCount = (state: AppState): number => {
  return state.products.productsCount;
};

export const selectorProductsSexValues = (state: AppState): string[] => {
  return state.products.productSex;
};

export const selectorProductsCategoryValues = (state: AppState): string[] => {
  return state.products.productCategories;
};

// REDUCER
interface initState {
  productSex: string[];
  productCategories: string[];
  productsCount: number;
  productsRequestData: {
    pending: Boolean;
    success: Boolean;
    error: Boolean;
    msg: string;
  };
  singleProductRequestData: {
    pending: Boolean;
    success: Boolean;
    error: Boolean;
    msg: string;
  };
  products: productData[];
  singleProduct: productData | null;
  carouselProducts: productData[];
  latestProducts: productData[];
  bestsellers: productData[];
  similarProducts: productData[];
}

const initState: initState = {
  productSex: ['unisex', 'male', 'female'],
  productCategories: ['t-shirt', 'backpack', 'blouse', 'band', 'jacket'],
  productsCount: 0,
  productsRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  singleProductRequestData: {
    pending: false,
    success: false,
    error: false,
    msg: ''
  },
  products: [],
  singleProduct: null,
  carouselProducts: [],
  latestProducts: [],
  bestsellers: [],
  similarProducts: []
};

export function productReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.PRODUCTS_COUNT:
      return { ...state, productsCount: action.payload };
    case types.PRODUCTS_GET_ALL_LOADING:
      return {
        ...state,
        productsRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: ''
        }
      };
    case types.PRODUCTS_GET_ALL_SUCCESS:
      return {
        ...state,
        productsRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: ''
        }
      };
    case types.PRODUCTS_GET_ALL_FAIL:
      return {
        ...state,
        productsRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    case types.PRODUCTS_GET_ONE_LOADING:
      return {
        ...state,
        singleProductRequestData: {
          pending: true,
          success: false,
          error: false,
          msg: ''
        }
      };
    case types.PRODUCTS_GET_ONE_SUCCESS:
      return {
        ...state,
        singleProductRequestData: {
          pending: false,
          success: true,
          error: false,
          msg: ''
        }
      };
    case types.PRODUCTS_GET_ONE_FAIL:
      return {
        ...state,
        singleProductRequestData: {
          pending: false,
          success: false,
          error: true,
          msg: action.payload
        }
      };
    case types.PRODUCTS_GET_ALL:
      return { ...state, products: action.payload };
    case types.PRODUCTS_GET_LATEST:
      return { ...state, latestProducts: action.payload };
    case types.PRODUCTS_GET_CAROUSEL:
      return { ...state, carouselProducts: action.payload };
    case types.PRODUCTS_GET_BESTSELLERS:
      return { ...state, bestsellers: action.payload };
    case types.PRODUCTS_GET_SIMILAR:
      return { ...state, similarProducts: action.payload };
    case types.PRODUCTS_GET_ONE:
      return { ...state, singleProduct: action.payload };
    default:
      return { ...state };
  }
}
