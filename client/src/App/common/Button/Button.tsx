import React from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  children: string;
  type: 'primary' | 'secondary' | 'transparent';
  disabled: Boolean;
  action: Function;
  size: 'normal' | 'small';
  submitType: Boolean;
}

const Button = (props: IProps) => {
  const { children, disabled, action, submitType } = props;

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

  const btnSize = () => {
    const { size } = props;

    switch (size) {
      case 'normal':
        return '';
      case 'small':
        return style.main_button_small;
      default:
        return '';
    }
  };

  return (
    <button
      onClick={!disabled ? () => action() : () => null}
      disabled={disabled ? true : false || false}
      className={`${btnType()} ${btnSize()}`}
      type={submitType ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  action: () => null,
  size: 'normal',
  submitType: false
};

export default Button;
