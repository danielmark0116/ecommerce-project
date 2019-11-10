import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { providerUserData } from '../../types/userData';
import { authLoginThunk } from '../../actions/authActions';
import Center from '../../common/Center/Center';

import style from '../../styles/main.module.scss';

const FacebookLoginBtn = (props: dispatchToProps) => {
  const { loginThunk } = props;

  const handleFacebookLogin = (data: any) => {
    const providerData: providerUserData = {
      providerId: data.id,
      name: data.name,
      email: data.email,
      userPic: data.picture.data.url,
      providerToken: data.accessToken
    };

    loginThunk('facebook', providerData);
  };

  return (
    <Center>
      <FacebookLogin
        appId={process.env.REACT_APP_CLIENT_ID_FACEBOOK}
        autoLoad={false}
        fields="name,email,picture"
        redirectUri={
          process.env.REACT_APP_MODE === 'production'
            ? 'https://grychtol.com.pl'
            : 'http://localhost:300'
        }
        cssClass={style.fb_btn}
        onClick={() => null}
        callback={handleFacebookLogin}
        onFailure={(e: any) => null}
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
)(FacebookLoginBtn);
