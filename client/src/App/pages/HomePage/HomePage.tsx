import React, { Fragment } from 'react';

import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import ProductsList from '../../features/ProductsList/ProductsListContainer';

import Button from '../../common/Button/Button';

const HomePage = () => {
  return (
    <Fragment>
      <Title size="large" align="center">
        Latest products
      </Title>
      <ProductsList
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={6}
        initFiltrString="sort=date-1"
        fetchAll={true}
        productsState="latest"
      />
    </Fragment>
  );
};

export default HomePage;
