import React, { Fragment } from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  picString: string;
  ribbon: string;
}

const Image = (props: IProps) => {
  const { picString, ribbon } = props;

  return (
    <Fragment>
      <div className={style.image_container}>
        <img src={picString} className={style.image} alt="" />
        <div className={style.image_ribbon}>{ribbon}</div>
      </div>
    </Fragment>
  );
};

Image.defaultProps = {
  ribbon: ''
};

export default Image;
