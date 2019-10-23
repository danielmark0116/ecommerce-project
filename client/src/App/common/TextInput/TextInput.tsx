import React, { Fragment } from 'react';

import style from '../../styles/main.module.scss';

interface IProps {
  extended: Boolean;
  label: string;
  placeholder: string;
  fieldName: string;
  fieldValue: string;
  onChange: Function;
  error: Boolean;
  errorMsg: string;
}

const TextInput = (props: IProps) => {
  const {
    extended,
    label,
    fieldName,
    fieldValue,
    onChange,
    placeholder,
    error,
    errorMsg
  } = props;

  const errorClass = () => {
    switch (error) {
      case true:
        return style.input_error;
      case false:
        return style.input;
      default:
        return style.input;
    }
  };

  return (
    <Fragment>
      <div className={style.input_container}>
        {label.length > 0 && <label htmlFor={fieldName}>{label}</label>}
        <div className={errorClass()}>
          {!extended ? (
            <input
              type="text"
              name={fieldName}
              id={fieldName}
              value={fieldValue}
              placeholder={placeholder}
              onChange={e => onChange(e)}
              autoComplete="off"
            />
          ) : (
            <p>html parser</p>
          )}
        </div>
        {error && fieldValue.length === 0 ? (
          <div className={style.input_error_msg}>Empty field</div>
        ) : (
          error && <div className={style.input_error_msg}>{errorMsg}</div>
        )}
      </div>
    </Fragment>
  );
};

TextInput.defaultProps = {
  extended: false
};

export default TextInput;
