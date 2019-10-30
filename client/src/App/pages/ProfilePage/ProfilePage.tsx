import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

import ProfileHeader from '../../features/ProfileHeader/ProfileHeader';
import ProfileAddresses from '../../features/ProfileAddresses/ProfileAddressesContainer';
import ProfileOrders from '../../features/ProfileOrders/ProfileOrdersContainer';

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
          <ProfileOrders></ProfileOrders>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProfilePage;
