import { userAddress } from './userAddress';

export interface orderData {
  _id: string;
  userId: string;
  userEmail: string;
  userPatron: Boolean;
  userName: string;
  address: userAddress;
  deliveryType: string;
  deliveryValue: number;
  cart: any[];
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
