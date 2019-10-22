import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
}

const Center = (props: IProps) => {
  const { children } = props;

  return <div className={style.center_container}>{children}</div>;
};

export default Center;
