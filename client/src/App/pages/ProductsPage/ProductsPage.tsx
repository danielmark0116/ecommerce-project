import React from 'react';

import ProductsList from '../../features/ProductsList/ProductsListContainer';

const ProductsPage = () => {
  return (
    <ProductsList
      fixedWidth={true}
      horizontalScroll={false}
      scrollOnlyPhones={true}
      withFilters={true}
      pagination={true}
      itemsPerPage={6}
      initFiltrString=""
      fetchAll={true}
      productsState="products"
    />
  );
};

export default ProductsPage;
