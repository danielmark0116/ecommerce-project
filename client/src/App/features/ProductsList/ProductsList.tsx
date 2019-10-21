import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { stateToProps, dispatchToProps } from './ProductsListContainer';
import { formatFilterString } from '../../helpers/filterStringFormatter';

import FlexContainer from '../../common/FlexGrid/FlexContainer';
import FlexItem from '../../common/FlexGrid/FlexItem';
import ProductCard from '../../common/ProductCard/ProductCard';
import ProductFilters from '../ProductFilters/ProductFilters';
import Pagination from '../../common/Pagination/Pagination';
import { productFilters } from '../../types/productFilters';

interface IProps {}

type Props = stateToProps & dispatchToProps & IProps;

const ProductsList = (props: Props) => {
  const [activePage, setActivePage] = useState(1);
  const [filterString, setFilterString] = useState(props.initFiltrString);

  const {
    products,
    pagination,
    itemsPerPage,
    productsCount,
    withFilters,
    fixedWidth,
    horizontalScroll,
    scrollOnlyPhones,
    sexValues,
    categoryValues,
    fetchAll
  } = props;

  useEffect(() => {
    const { getProducts } = props;

    getProducts(
      fetchAll,
      (activePage - 1) * itemsPerPage,
      itemsPerPage,
      filterString
    );
  }, ['']);

  const handlePageChange = (callbackPage: number) => {
    const { getProducts, fetchAll } = props;

    setActivePage(callbackPage);
    getProducts(
      fetchAll,
      (callbackPage - 1) * itemsPerPage,
      itemsPerPage,
      filterString
    );
  };

  const applyFilters = (filters: productFilters) => {
    const { getProducts, itemsPerPage, fetchAll } = props;
    setActivePage(1);
    setFilterString(formatFilterString(filters));

    getProducts(
      fetchAll,
      0 * itemsPerPage,
      itemsPerPage,
      formatFilterString(filters)
    );
  };

  return (
    <Row>
      {withFilters && (
        <Col md="12" xl="3">
          <ProductFilters
            applyFilters={applyFilters}
            sexValues={sexValues}
            categoryValues={categoryValues}
          ></ProductFilters>
        </Col>
      )}
      <Col md="12" xl={withFilters ? '9' : '12'}>
        <FlexContainer
          fixedWidth={fixedWidth}
          horizontalScroll={horizontalScroll}
          scrollOnlyPhones={scrollOnlyPhones}
        >
          <Fragment>
            {products.map((product, index) => (
              <FlexItem key={index}>
                <ProductCard productData={product}></ProductCard>
              </FlexItem>
            ))}
          </Fragment>
        </FlexContainer>
        {pagination && (
          <Pagination
            action={handlePageChange}
            activePage={activePage}
            numberOfPages={Math.ceil(productsCount / itemsPerPage)}
          />
        )}
      </Col>
    </Row>
  );
};

export default ProductsList;
