import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import style from '../../styles/main.module.scss';
import { AppState } from '../../reducers';
import { selectorAuthProfileName } from '../../reducers/authReducer';

const UserBar = (props: stateToProps) => {
  const { userName } = props;

  return (
    <div className={style.user_bar}>
      <Container>
        <p>
          Hi there, <b>{userName}!</b> You have <b>0</b> active orders.
        </p>
      </Container>
    </div>
  );
};

interface stateToProps {
  userName: string;
}

const mapStateToProps = (state: AppState) => ({
  userName: selectorAuthProfileName(state)
});

export default connect(mapStateToProps)(UserBar);
