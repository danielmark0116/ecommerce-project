import { ActionTypes } from '../actions/actionTypes';
import { AppState } from '.';
import { couponsData, couponData } from '../types/couponsData';

// SELECTORS
export const selectorCoupons = (state: AppState): couponsData => {
  return state.generals.coupons;
};

export const selectorGeneralsNewsBarText = (state: AppState): string => {
  return state.generals.newsBarText;
};

interface initState {
  coupons: couponsData;
  newsBarText: string;
}

const initState: initState = {
  coupons: [
    {
      name: 'Test',
      code: 'test',
      value: 0.8
    },
    {
      name: 'Christmas Fever',
      code: 'santa',
      value: 0.7
    }
  ],
  newsBarText:
    "Don't miss this year's sales season! Use SANTA coupon code for even more discount!"
};

export function generalsReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
