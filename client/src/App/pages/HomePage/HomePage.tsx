import React, { Fragment } from 'react';

import Subtitle from '../../common/Subtitle/Subtitle';
import ProductsList from '../../features/ProductsList/ProductsListContainer';

const HomePage = () => {
  return (
    <Fragment>
      <Subtitle align="center">Latest products!</Subtitle>
      <ProductsList
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={3}
        initFiltrString="sort=date-1"
        fetchAll={true}
        productsState="latest"
      />
    </Fragment>
  );
};

export default HomePage;
