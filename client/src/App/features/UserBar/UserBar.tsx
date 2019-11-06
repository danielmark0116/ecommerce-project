import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import style from '../../styles/main.module.scss';

import { fadeIn } from '../../animations/fades';

import { AppState } from '../../reducers';
import { selectorAuthProfileName } from '../../reducers/authReducer';
import { selectorOrderActiveQuantity } from '../../reducers/orderReducer';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { orderGetUsersActiveOrdersQuantityThunk } from '../../actions/orderActions';

const UserBar = (props: stateToProps & dispatchToProps) => {
  const { userName, orderActiveQ, getActiveOrdersQ } = props;

  const userBarRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    fadeIn(userBarRef.current);
    getActiveOrdersQ();
  }, ['']);

  return (
    <div ref={userBarRef} className={style.user_bar}>
      <Container>
        <p>
          Hi there, <b>{userName}! </b>
          {orderActiveQ !== null ? (
            <span>
              You have <b>{orderActiveQ}</b> active orders.
              <Link to="/profile">
                <b> Check your profile</b>
              </Link>
            </span>
          ) : (
            ''
          )}
        </p>
      </Container>
    </div>
  );
};

interface stateToProps {
  userName: string;
  orderActiveQ: number | null;
}

interface dispatchToProps {
  getActiveOrdersQ: Function;
}

const mapStateToProps = (state: AppState) => ({
  userName: selectorAuthProfileName(state),
  orderActiveQ: selectorOrderActiveQuantity(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  getActiveOrdersQ: () => dispatch(orderGetUsersActiveOrdersQuantityThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBar);
