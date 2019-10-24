import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Center from '../../common/Center/Center';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import SizedBox from '../../common/SizedBox/SizedBox';

import style from '../../styles/main.module.scss';

import { toggleLoginBox, toggleOverlay } from '../../animations/login_box';
import { providerUserData } from '../../types/userData';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { authLoginThunk } from '../../actions/authActions';

interface IProps {
  children?: React.ReactChild;
  active: Boolean;
  closeAction: Function;
}

const LoginBox = (props: IProps & dispatchToProps) => {
  const { children, active, closeAction, loginThunk } = props;
  const loginBoxRef = React.createRef<HTMLDivElement>();
  const overlayRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    toggleLoginBox(loginBoxRef.current, active);
    toggleOverlay(overlayRef.current, active);
  }, [active]);

  const handleGoogleLogin = (data: any) => {
    const providerData: providerUserData = {
      providerId: data.googleId,
      name: `${data.profileObj.givenName} ${data.profileObj.familyName}`,
      email: data.profileObj.email,
      userPic: data.profileObj.imageUrl
    };

    loginThunk('google', providerData);
  };

  const handleFacebookLogin = (data: any) => {
    const providerData: providerUserData = {
      providerId: data.id,
      name: data.name,
      email: data.email,
      userPic: data.picture.data.url
    };

    loginThunk('facebook', providerData);
  };

  return (
    <Fragment>
      <div
        onClick={() => closeAction()}
        ref={overlayRef}
        className={style.login_box_overlay}
      ></div>
      <div ref={loginBoxRef} className={style.login_box}>
        <div onClick={() => closeAction()} className={style.login_box_close}>
          <span className={style.cross_line}></span>
          <span className={style.cross_line}></span>
        </div>
        <Subtitle align="center">Login</Subtitle>

        <SizedBox>
          <Fragment>
            <Center>
              <GoogleLogin
                clientId="1093567595027-41es3no16kqfkfo5sj016cp6eutbkn72.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleLogin}
                onFailure={() => null}
                cookiePolicy={'single_host_origin'}
              />
            </Center>
            <br />
            <Center>
              <FacebookLogin
                appId="2451717065086054"
                autoLoad={false}
                fields="name,email,picture"
                cssClass={style.fb_btn}
                onClick={() => null}
                callback={handleFacebookLogin}
                onFailure={() => null}
              />
            </Center>
          </Fragment>
        </SizedBox>

        <Subtext uppercase={false} size="small" align="center">
          <Fragment>
            You don't have to create another useless account!
            <br />
            Use your existing one and lo gin with <br /> <b>Google</b> or{' '}
            <b>Facebook</b>!
          </Fragment>
        </Subtext>
      </div>
    </Fragment>
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
)(LoginBox);
