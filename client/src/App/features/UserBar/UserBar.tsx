import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import style from '../../styles/main.module.scss';

import { fadeIn } from '../../animations/fades';

import { AppState } from '../../reducers';
import { selectorAuthProfileName } from '../../reducers/authReducer';

const UserBar = (props: stateToProps) => {
  const { userName } = props;

  const userBarRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    fadeIn(userBarRef.current);
  }, ['']);

  return (
    <div ref={userBarRef} className={style.user_bar}>
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
