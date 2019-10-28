import { cartDataElements } from '../types/cartData';

const sizes = {
  xs: 0,
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
  xxl: 0
};

export const saveToLocalStore = (
  productId: string,
  productSize: string,
  quantity: number
) => {
  const cart: string = localStorage.getItem('cart') || '[]';
  const parsedCart: cartDataElements[] = JSON.parse(cart);

  if (parsedCart.length === 0) {
    parsedCart.push({
      id: productId,
      quantity: { ...sizes, [productSize]: quantity }
    });

    localStorage.setItem('cart', JSON.stringify(parsedCart));
  } else if (
    parsedCart
      .map((item, index) => {
        if (item.id === productId) return true;
      })
      .includes(true)
  ) {
    let newCart = parsedCart.map((item, index) => {
      if (item.id === productId) {
        let oldQuantity = 0;

        Object.keys(item.quantity).forEach((size, index) => {
          if (size === productSize) {
            oldQuantity = Object.values(item.quantity)[index] || 0;
          }
        });

        return {
          ...item,
          quantity: { ...item.quantity, [productSize]: oldQuantity + quantity }
        };
      } else {
        return { ...item };
      }
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
  } else {
    parsedCart.push({
      id: productId,
      quantity: { ...sizes, [productSize]: quantity }
    });

    localStorage.setItem('cart', JSON.stringify(parsedCart));
  }
};

export const getCartIds = () => {
  const cart: string = localStorage.getItem('cart') || '[]';
  const parsedCart: cartDataElements[] = JSON.parse(cart);

  return parsedCart.map(item => item.id);
};

export const getCart = () => {
  const cart: string = localStorage.getItem('cart') || '[]';
  const parsedCart: cartDataElements[] = JSON.parse(cart);

  return parsedCart;
};

export const clearCart = () => {
  localStorage.setItem('cart', '[]');
};
