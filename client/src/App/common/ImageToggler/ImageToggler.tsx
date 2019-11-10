import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  picString: string;
  action: Function;
}

const ImageToggler = (props: IProps) => {
  const { picString, action } = props;

  return (
    <div className={style.image_toggler_container} onClick={() => action()}>
      <div className={style.image_pill}>
        <img src={picString} alt="" />
      </div>
    </div>
  );
};

export default ImageToggler;
