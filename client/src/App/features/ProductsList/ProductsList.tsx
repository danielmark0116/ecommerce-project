import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

import { stateToProps, dispatchToProps } from "./ProductsListContainer";
import { formatFilterString } from "../../helpers/filterStringFormatter";

import Loader from "../../common/Loader/Loader";
import FlexContainer from "../../common/FlexGrid/FlexContainer";
import FlexItem from "../../common/FlexGrid/FlexItem";
import ProductCard from "../../common/ProductCard/ProductCard";
import ProductFilters from "../ProductFilters/ProductFilters";
import Pagination from "../../common/Pagination/Pagination";
import { productFilters } from "../../types/productFilters";
import ProductSearchBar from "../ProductSearchBar/ProductSearchBar";
import Center from "../../common/Center/Center";
import Text from "../../common/Text/Text";
import Error from "../../common/Error/Error";

interface IProps {}

type Props = stateToProps & dispatchToProps & IProps;

const ProductsList = (props: Props) => {
  const [activePage, setActivePage] = useState(1);
  const [filterString, setFilterString] = useState(props.initFiltrString);
  const [titleString, setTitleFilterString] = useState("");

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
    fetchAll,
    productCardsSize
  } = props;

  const { pending, error, success } = props.productsRequestData;

  useEffect(() => {
    const { getProducts } = props;

    getProducts(
      fetchAll,
      (activePage - 1) * itemsPerPage,
      itemsPerPage,
      filterString
    );
  }, [1]);

  const handlePageChange = (callbackPage: number) => {
    const { getProducts, fetchAll } = props;

    setActivePage(callbackPage);
    getProducts(
      fetchAll,
      (callbackPage - 1) * itemsPerPage,
      itemsPerPage,
      filterString + titleString
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
      formatFilterString(filters) + titleString
    );
  };

  const applyNameSearch = (title: string) => {
    const { getProducts, itemsPerPage, fetchAll } = props;
    setActivePage(1);

    setTitleFilterString(`&title=${title}`);

    getProducts(
      fetchAll,
      0 * itemsPerPage,
      itemsPerPage,
      filterString + `&title=${title}`
    );
  };

  return (
    <Fragment>
      {withFilters && (
        <ProductSearchBar submitForm={applyNameSearch}></ProductSearchBar>
      )}
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
        <Col md="12" xl={withFilters ? "9" : "12"}>
          <FlexContainer
            fixedWidth={fixedWidth}
            horizontalScroll={horizontalScroll}
            scrollOnlyPhones={scrollOnlyPhones}
          >
            <Fragment>
              {error && <Error />}
              {pending && <Loader></Loader>}
              {success && products.length === 0 && (
                <Center>
                  <Text color="warning" align="center">
                    No such products
                  </Text>
                </Center>
              )}
              {success &&
                products.map((product, index) => (
                  <FlexItem key={index}>
                    <ProductCard
                      cardIndex={index}
                      cardSize={productCardsSize}
                      productData={product}
                    ></ProductCard>
                  </FlexItem>
                ))}
            </Fragment>
          </FlexContainer>
          {pagination && success && (
            <Pagination
              action={handlePageChange}
              activePage={activePage}
              numberOfPages={Math.ceil(productsCount / itemsPerPage)}
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductsList;
