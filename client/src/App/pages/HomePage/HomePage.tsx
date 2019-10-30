import React, { Fragment } from 'react';

import Title from '../../common/Title/Title';
import ProductsList from '../../features/ProductsList/ProductsListContainer';
import SizedBox from '../../common/SizedBox/SizedBox';

const HomePage = () => {
  return (
    <Fragment>
      <Title size="small" align="center">
        Latest products
      </Title>
      <ProductsList
        productCardsSize="small"
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={8}
        initFiltrString="sort=price1"
        fetchAll={true}
        productsState="latest"
      />
      <SizedBox></SizedBox>
      <Title size="small" align="center">
        Bestsellers
      </Title>
      <ProductsList
        productCardsSize="small"
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={8}
        initFiltrString="sort=sold-1"
        fetchAll={true}
        productsState="bestsellers"
      />
    </Fragment>
  );
};

export default HomePage;
