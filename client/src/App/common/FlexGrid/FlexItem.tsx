import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: React.ReactChild;
}

const FlexItem = (props: IProps) => {
  const { children } = props;

  const preventDragHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      onDragStart={preventDragHandler}
      draggable={false}
      className={style.flex_item}
    >
      {children}
    </div>
  );
};

export default FlexItem;
