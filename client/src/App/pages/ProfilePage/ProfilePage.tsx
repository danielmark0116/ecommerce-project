import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

import ProfileHeader from '../../features/ProfileHeader/ProfileHeader';
import ProfileAddresses from '../../features/ProfileAddresses/ProfileAddressesContainer';

const ProfilePage = () => {
  return (
    <Fragment>
      <ProfileHeader></ProfileHeader>
      <br />
      <Row>
        <Col sm="12" xl="6">
          <ProfileAddresses></ProfileAddresses>
        </Col>
        <Col sm="12" xl="6">
          dsf
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProfilePage;
