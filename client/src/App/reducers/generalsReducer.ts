import { ActionTypes } from '../actions/actionTypes';
import { AppState } from '.';
import { couponsData, couponData } from '../types/couponsData';

// SELECTORS
export const selectorCoupons = (state: AppState): couponsData => {
  return state.generals.coupons;
};

interface initState {
  coupons: couponsData;
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
  ]
};

export function generalsReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
