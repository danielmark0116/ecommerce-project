import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
}

const FlexItem = (props: IProps) => {
  const { children } = props;

  return <div className={style.flex_item}>{children}</div>;
};

export default FlexItem;
