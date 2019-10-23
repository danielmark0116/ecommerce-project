import React, { Fragment } from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  picString: string;
  ribbon: string;
  size: 'normal' | 'small';
}

const Image = (props: IProps) => {
  const { picString, ribbon, size } = props;

  const sizeClass = () => {
    switch (size) {
      case 'normal':
        return style.image_container_normal;
      case 'small':
        return style.image_container_small;
      default:
        return style.image_container_normal;
    }
  };

  return (
    <Fragment>
      <div className={sizeClass()}>
        <img src={picString} className={style.image} alt="" />
        <div className={style.image_ribbon}>{ribbon}</div>
      </div>
    </Fragment>
  );
};

Image.defaultProps = {
  ribbon: '',
  size: 'normal'
};

export default Image;
