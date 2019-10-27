export const deleteCouponDataFromSession = () => {
  sessionStorage.removeItem('discountCode');
};
