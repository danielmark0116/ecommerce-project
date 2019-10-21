import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import {
  selectorProductsGetAll,
  selectorProductsRequestData,
  selectorProductsCount,
  selectorProductsSexValues,
  selectorProductsCategoryValues,
  selectorProductsGetLatest,
  selectorProductsGetCarousel
} from '../../reducers/productReducer';
import { productData } from '../../types/productData';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { productsGetAllThunk } from '../../actions/productActions';

import ProductsList from './ProductsList';

interface IProps {
  itemsPerPage: number;
  pagination: Boolean;
  withFilters: Boolean;
  fixedWidth: Boolean;
  horizontalScroll: Boolean;
  scrollOnlyPhones: Boolean;
  initFiltrString: string;
  fetchAll: Boolean;
  productsState: 'products' | 'carousel' | 'latest';
}

export interface stateToProps {
  products: productData[];
  pending: Boolean;
  error: Boolean;
  success: Boolean;
  productsCount: number;
  itemsPerPage: number;
  pagination: Boolean;
  withFilters: Boolean;
  fixedWidth: Boolean;
  horizontalScroll: Boolean;
  scrollOnlyPhones: Boolean;
  initFiltrString: string;
  sexValues: string[];
  categoryValues: string[];
  fetchAll: Boolean;
}

export interface dispatchToProps {
  getProducts: Function;
}

const mapStateToProps = (state: AppState, ownProps: IProps) => ({
  products:
    ownProps.productsState === 'products'
      ? selectorProductsGetAll(state)
      : ownProps.productsState === 'latest'
      ? selectorProductsGetLatest(state)
      : ownProps.productsState === 'carousel'
      ? selectorProductsGetCarousel(state)
      : [],
  pending: selectorProductsRequestData(state).pending,
  error: selectorProductsRequestData(state).error,
  success: selectorProductsRequestData(state).success,
  productsCount: selectorProductsCount(state),
  itemsperPage: ownProps.itemsPerPage,
  pagination: ownProps.pagination,
  withFilters: ownProps.withFilters,
  fixedWidth: ownProps.fixedWidth,
  horizontalScroll: ownProps.horizontalScroll,
  scrollOnlyPhones: ownProps.scrollOnlyPhones,
  initFiltrString: ownProps.initFiltrString,
  sexValues: selectorProductsSexValues(state),
  categoryValues: selectorProductsCategoryValues(state),
  fetchAll: ownProps.fetchAll
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>,
  ownProps: IProps
) => ({
  getProducts: (
    fetchAll: Boolean,
    skip: number = 0,
    limit: number = 0,
    filter: string = ''
  ) =>
    dispatch(
      productsGetAllThunk(fetchAll, skip, limit, filter, ownProps.productsState)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
