import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children?: React.ReactChild;
}

const SizedBox = (props: IProps) => {
  const { children } = props;

  return <div className={style.sized_box}>{children}</div>;
};

export default SizedBox;
