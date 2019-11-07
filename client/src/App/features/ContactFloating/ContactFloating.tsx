import React, { useEffect, useState, Fragment } from 'react';

import Center from '../../common/Center/Center';
import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Text from '../../common/Text/Text';

import style from '../../styles/main.module.scss';

import {
  contactFloEnter,
  contactFloBlobEnter,
  floatingClickIn,
  floatingClickOut
} from '../../animations/_contact_floating';

const ContactFloating = () => {
  const [active, toggleActive] = useState(false);

  const floatingRef = React.createRef<HTMLDivElement>();
  const floatingBlobRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    contactFloEnter(floatingRef.current, 3);
    contactFloBlobEnter(floatingBlobRef.current, 3.5);
  }, ['']);

  const clickIn = () => {
    floatingClickIn(floatingRef.current);
  };

  const clickOut = () => {
    floatingClickOut(floatingRef.current);
  };

  return (
    <Fragment>
      <div
        ref={floatingRef}
        onClick={() => {
          toggleActive(!active);
        }}
        onMouseDown={() => {
          clickIn();
        }}
        onTouchStart={() => {
          clickIn();
        }}
        onTouchCancel={() => {
          clickOut();
        }}
        onTouchEnd={() => {
          clickOut();
        }}
        onMouseLeave={() => {
          clickOut();
        }}
        onMouseUp={() => {
          clickOut();
        }}
        className={
          active
            ? style.contact_floating_container_active
            : style.contact_floating_container
        }
      >
        <div ref={floatingBlobRef} className={style.msg_blob}>
          Have any questions? Contact us!
        </div>
        <div className={style.inner_border}>
          <i className={`fas fa-phone ${style.phone}`}></i>
          <i className={`fas fa-times ${style.close}`}></i>
        </div>
      </div>
      <div
        className={
          active
            ? style.contact_data_container_active
            : style.contact_data_container
        }
      >
        <Title align="center" color="white">
          Contact us!
        </Title>
        <Text align="center" size="small" color="white">
          PHONE:
        </Text>
        <Subtitle align="center" size="small" color="white">
          567-567-345
        </Subtitle>
        <Text align="center" size="small" color="white">
          EMAIL:
        </Text>
        <Subtitle align="center" size="small" color="white">
          mail@mail.com
        </Subtitle>
        <Text align="center" size="small" color="white">
          ADDRESS:
        </Text>
        <Subtitle align="center" size="small" color="white">
          267th Sunny Avenue, Cool State, City
        </Subtitle>
      </div>
    </Fragment>
  );
};

export default ContactFloating;
