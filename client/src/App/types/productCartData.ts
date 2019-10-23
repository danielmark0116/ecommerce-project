import { cartDataElements } from './cartData';

export interface productCartData {
  _id: string;
  name: string;
  category: string;
  sex: string;
  price: number;
  img: string;
}

export type cartItemsType = (productCartData & cartDataElements | any)[];

export type cartItemType = productCartData & cartDataElements | any;
