import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { AppState } from '../../reducers';
import {
  selectorAuthProfilePic,
  selectorAuthProfileName,
  selectorAuthProfileEmail
} from '../../reducers/authReducer';

import ProfilePic from '../../common/ProfilePic/ProfilePic';
import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';

type Props = stateToProps;

const ProfileHeader = (props: Props) => {
  const { userName, picString, userEmail } = props;

  return (
    <Fragment>
      <Row>
        <Col xs="12" sm="4" lg="2" xl="2">
          <ProfilePic picString={picString}></ProfilePic>
        </Col>
        <Col xs="12" sm="8" l="10" xl="10">
          <Subtext size="small">your profile</Subtext>
          <Title>{userName}</Title>
          <Subtitle size="small">{userEmail}</Subtitle>
        </Col>
      </Row>
    </Fragment>
  );
};

interface stateToProps {
  picString: string;
  userName: string;
  userEmail: string;
}

const mapStateToProps = (state: AppState) => ({
  picString: selectorAuthProfilePic(state),
  userName: selectorAuthProfileName(state),
  userEmail: selectorAuthProfileEmail(state)
});

export default connect(mapStateToProps)(ProfileHeader);
