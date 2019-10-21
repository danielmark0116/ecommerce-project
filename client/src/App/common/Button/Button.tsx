import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: string;
  type: 'primary' | 'secondary' | 'transparent';
  disabled: Boolean;
  action: Function;
}

const Button = (props: IProps) => {
  const { children, disabled, action } = props;

  const btnType = () => {
    const { type } = props;

    switch (type) {
      case 'primary':
        return style.main_button_primary;
      case 'secondary':
        return style.main_button_secondary;
      case 'transparent':
        return style.main_button_transparent;
      default:
        return style.main_button_primary;
    }
  };

  return (
    <button
      onClick={!disabled ? () => action() : () => null}
      disabled={disabled ? true : false || false}
      className={`${btnType()}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  action: () => null
};

export default Button;
