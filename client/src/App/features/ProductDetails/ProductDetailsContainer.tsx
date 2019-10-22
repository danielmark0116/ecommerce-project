import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ProductDetails from './ProductDetails';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducers';
import {
  selectorProductsGetOne,
  selectorSingleProductRequestData
} from '../../reducers/productReducer';
import { productData } from '../../types/productData';
import { requestData } from '../../types/requestData';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { productsGetByIdThunk } from '../../actions/productActions';

interface Routes {
  id: string;
}

interface IProps extends RouteComponentProps<Routes> {}

export interface stateToProps {
  productId: string;
  singleProduct: productData | null;
  singleProductRequestData: requestData;
}

export interface dispatchToProps {
  getProductById: Function;
}

const mapStateToProps = (state: AppState, ownProps: IProps) => ({
  productId: ownProps.match.params.id,
  singleProduct: selectorProductsGetOne(state),
  singleProductRequestData: selectorSingleProductRequestData(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getProductById: (id: string) => dispatch(productsGetByIdThunk(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductDetails)
);
