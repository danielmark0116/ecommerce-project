import { userAddress } from './userAddress';
import { cartItemType } from './productCartData';

export interface orderData {
  _id: string;
  userId: string;
  userEmail: string;
  userPatron: Boolean;
  userName: string;
  address: userAddress;
  deliveryType: string;
  deliveryValue: number;
  cart: cartItemType[];
  cartValue: number;
  discount: number;
  discountName: string;
  patronDiscount: number;
  totalValue: number;
  status: string;
  deliveryId: string;
}

export interface orderShortData {
  _id: string;
  userId: string;
  userEmail: string;
  status: string;
  totalValue: number;
  deliveryValue: number;
}
