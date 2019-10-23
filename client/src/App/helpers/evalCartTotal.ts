import _ from 'lodash';
import { productCartData, cartItemsType } from '../types/productCartData';

export const evalCartTotal = (cartData: cartItemsType) => {
  let pricesToSum = cartData.map(item => {
    const cartTotal =
      item.price * _.values(item.quantity).reduce((a, b) => a + b);
    return cartTotal;
  });

  return _.round(pricesToSum.reduce((a, b) => a + b), 2);
};
