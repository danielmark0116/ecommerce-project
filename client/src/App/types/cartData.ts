export interface cartData {
  id: string;
  quantity: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
}

export interface cartDataElements {
  id: string;
  quantity: {
    xs?: number;
    s?: number;
    m?: number;
    l?: number;
    xl?: number;
    xxl?: number;
  };
}
