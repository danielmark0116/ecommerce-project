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
        height={100}
        width={100}
        timeout={0}
      />
    </Center>
  );
};

export default Loader;
