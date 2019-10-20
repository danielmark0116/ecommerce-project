import React, { Fragment } from 'react';

import FlexContainer from '../../common/FlexGrid/FlexContainer';
import FlexItem from '../../common/FlexGrid/FlexItem';
import ProductCard from '../../common/ProductCard/ProductCard';

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductsList = () => {
  return (
    <FlexContainer
      fixedWidth={true}
      horizontalScroll={true}
      scrollOnlyPhones={true}
    >
      <Fragment>
        {products.map(x => (
          <FlexItem>
            <ProductCard></ProductCard>
          </FlexItem>
        ))}
      </Fragment>
    </FlexContainer>
  );
};

export default ProductsList;
