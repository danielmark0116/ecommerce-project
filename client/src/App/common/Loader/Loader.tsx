import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Center from '../Center/Center';

const Loader = () => {
  return (
    <Center>
      <LoaderSpinner
        type="MutatingDots"
        color="#060036"
        height={150}
        width={150}
        timeout={0}
      />
    </Center>
  );
};

export default Loader;
