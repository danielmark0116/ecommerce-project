import React from 'react';

import Text from '../Text/Text';

import style from '../../styles/main.module.scss';

interface IProps {
  text: string;
}

export const Error = (props: IProps) => {
  const { text } = props;

  return (
    <div className={style.error_container}>
      <i className={`fas fa-bug ${style.error_icon}`}></i>
      <Text color="danger" align="center">
        {text}
      </Text>
    </div>
  );
};

Error.defaultProps = {
  text: 'Seems like there is an error... Try again later'
};

export default Error;
