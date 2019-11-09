import React, { Fragment } from 'react';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import ProductsList from '../../features/ProductsList/ProductsListContainer';
import SizedBox from '../../common/SizedBox/SizedBox';

const HomePage = () => {
  return (
    <Fragment>
      <Title size="small" align="center">
        Latest products
      </Title>
      <Text align="center">Just arrived to the store!</Text>
      <ProductsList
        productCardsSize="small"
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={8}
        initFiltrString="sort=price1"
        fetchAll={false}
        productsState="latest"
      />
      <SizedBox></SizedBox>
      <Title size="small" align="center">
        Bestsellers
      </Title>
      <Text align="center">See out best selling clothes!</Text>
      <ProductsList
        productCardsSize="small"
        fixedWidth={true}
        horizontalScroll={true}
        scrollOnlyPhones={false}
        withFilters={false}
        pagination={false}
        itemsPerPage={8}
        initFiltrString="sort=sold-1"
        fetchAll={false}
        productsState="bestsellers"
      />
    </Fragment>
  );
};

export default HomePage;
