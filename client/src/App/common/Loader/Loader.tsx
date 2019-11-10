import React from 'react';

import LoaderSpinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Center from '../Center/Center';

import style from '../../styles/main.module.scss';

const Loader = () => {
  return (
    <Center>
      <div className={style.loader_container}>
        <LoaderSpinner
          type="MutatingDots"
          height={100}
          width={100}
          color="#060036"
          timeout={0}
        />
      </div>
    </Center>
  );
};

export default Loader;
