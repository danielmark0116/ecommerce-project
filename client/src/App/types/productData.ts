export interface productData {
  name: string;
  desc: string;
  category: string;
  sex: string;
  ribbon: string;
  price: number;
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
  img: string;
  published: Boolean;
}

export interface productDataElements {
  name?: string;
  desc?: string;
  category?: string;
  sex?: string;
  ribbon?: string;
  price?: number;
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
  img?: string;
  published?: Boolean;
}
