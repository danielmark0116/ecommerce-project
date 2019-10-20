import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FlexContainer from '../../common/FlexGrid/FlexContainer';
import FlexItem from '../../common/FlexGrid/FlexItem';
import ProductCard from '../../common/ProductCard/ProductCard';
import ProductFilters from '../ProductFilters/ProductFilters';

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductsList = () => {
  return (
    <Row>
      <Col md="12" xl="3">
        <ProductFilters></ProductFilters>
      </Col>
      <Col md="12" xl="9">
        <FlexContainer
          fixedWidth={true}
          horizontalScroll={true}
          scrollOnlyPhones={true}
        >
          <Fragment>
            {products.map((x, index) => (
              <FlexItem key={index}>
                <ProductCard></ProductCard>
              </FlexItem>
            ))}
          </Fragment>
        </FlexContainer>
      </Col>
    </Row>
  );
};

export default ProductsList;
