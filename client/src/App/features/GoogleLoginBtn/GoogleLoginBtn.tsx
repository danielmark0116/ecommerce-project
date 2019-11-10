import React from 'react';
import { connect } from 'react-redux';

import Center from '../../common/Center/Center';

import { GoogleLogin } from 'react-google-login';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { providerUserData } from '../../types/userData';
import { authLoginThunk } from '../../actions/authActions';

const GoogleLoginBtn = (props: dispatchToProps) => {
  const { loginThunk } = props;

  const handleGoogleLogin = (data: any) => {
    const providerData: providerUserData = {
      providerId: data.googleId,
      name: `${data.profileObj.givenName} ${data.profileObj.familyName}`,
      email: data.profileObj.email,
      userPic: data.profileObj.imageUrl,
      providerToken: data.Zi.id_token
    };

    loginThunk('google', providerData);
  };

  return (
    <Center>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={(data: any) => console.log('google login error', data)}
        cookiePolicy={'single_host_origin'}
      />
    </Center>
  );
};

interface dispatchToProps {
  loginThunk: Function;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  loginThunk: (provider: 'facebook' | 'google', userData: providerUserData) =>
    dispatch(authLoginThunk(provider, userData))
});

export default connect(
  null,
  mapDispatchToProps
)(GoogleLoginBtn);
