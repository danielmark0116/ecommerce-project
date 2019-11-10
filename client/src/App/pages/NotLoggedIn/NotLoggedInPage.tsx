import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../common/Title/Title';
import Text from '../../common/Text/Text';
import GoogleLoginBtn from '../../features/GoogleLoginBtn/GoogleLoginBtn';
import { AppState } from '../../reducers';
import { selectorAuthIsLoggedIn } from '../../reducers/authReducer';

const HomePage = (props: stateToProps) => {
  const { isLoggedIn } = props;

  return (
    <Fragment>
      {isLoggedIn && <Redirect push to="/"></Redirect>}
      <Title size="small" align="center">
        You are not logged in.
      </Title>
      <Text align="center">
        Some features of this site require you to be logged in in order to
        continue.
      </Text>
      <br />
      <GoogleLoginBtn></GoogleLoginBtn>
    </Fragment>
  );
};

interface stateToProps {
  isLoggedIn: Boolean;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state)
});

export default connect(mapStateToProps)(HomePage);
