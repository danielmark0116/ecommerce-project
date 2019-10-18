import React, { Fragment } from 'react';

import FlexContainer from '../../common/FlexGrid/FlexContainer';
import FlexItem from '../../common/FlexGrid/FlexItem';

const ProductsList = () => {
  return (
    <FlexContainer
      fixedWidth={true}
      horizontalScroll={true}
      scrollOnlyPhones={true}
    >
      <Fragment>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        <FlexItem>item</FlexItem>
        {/* <FlexItem>item</FlexItem> */}
      </Fragment>
    </FlexContainer>
  );
};

export default ProductsList;
