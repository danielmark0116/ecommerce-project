import * as types from '../actions/actionTypes';
import { ActionTypes } from '../actions/actionTypes';

interface initState {
  productSex: string[];
  productCategories: string[];
}

const initState: initState = {
  productSex: ['unisex', 'male', 'female'],
  productCategories: ['t-shirt', 'blouse', 'jeans']
};

export function productReducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case types.TEST_ACTION:
      return { ...state };
    default:
      return { ...state };
  }
}
