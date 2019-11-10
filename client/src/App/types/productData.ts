export interface productData {
  _id: string;
  name: string;
  desc: string;
  category: string;
  sex: string;
  ribbon: string;
  price: number;
  salePrice: number;
  size: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  soldItems: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  sold: number;
  img: string;
  imgSecondary: string;
  published: Boolean;
}

export interface productDataElements {
  _id?: string;
  name?: string;
  desc?: string;
  category?: string;
  sex?: string;
  ribbon?: string;
  price?: number;
  salePrice?: number;
  size?: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  soldItems?: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  sold?: number;
  img?: string;
  imgSecondary?: string;
  published?: Boolean;
}
