import _ from 'lodash';
import { productCartData, cartItemsType } from '../types/productCartData';

export const evalCartTotal = (cartData: cartItemsType) => {
  return cartData.map(item => {
    const cartTotal =
      item.price * _.values(item.quantity).reduce((a, b) => a + b);
    return _.round(cartTotal, 2);
  });
};
