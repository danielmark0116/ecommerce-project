import React, { useEffect, useState, Fragment } from 'react';

import Center from '../../common/Center/Center';
import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Text from '../../common/Text/Text';

import style from '../../styles/main.module.scss';

import {
  contactFloEnter,
  contactFloBlobEnter
} from '../../animations/_contact_floating';

const ContactFloating = () => {
  const [active, toggleActive] = useState(false);

  const floatingRef = React.createRef<HTMLDivElement>();
  const floatingBlobRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    contactFloEnter(floatingRef.current, 4);
    contactFloBlobEnter(floatingBlobRef.current, 5);
  }, ['']);

  return (
    <div
      ref={floatingRef}
      onClick={() => {
        toggleActive(!active);
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
        <i className="fas fa-phone"></i>
      </div>

      <div className={style.contact_data_container}>
        <Center>
          <Title>Contact us!</Title>
        </Center>
        <Center>567-567-345</Center>
        <br />
        <Center>765th Blue Sky Avenue</Center>
        <Center>City, Florida</Center>
      </div>
    </div>
  );
};

export default ContactFloating;
