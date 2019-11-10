import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import Center from '../../common/Center/Center';
import Title from '../../common/Title/Title';
import Subtitle from '../../common/Subtitle/Subtitle';
import Subtext from '../../common/Subtext/Subtext';
import SizedBox from '../../common/SizedBox/SizedBox';
import Loader from '../../common/Loader/Loader';
import GoogleLoginBtn from '../GoogleLoginBtn/GoogleLoginBtn';

import style from '../../styles/main.module.scss';

import { toggleLoginBox, toggleOverlay } from '../../animations/login_box';
import { providerUserData } from '../../types/userData';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes } from '../../actions/actionTypes';
import { authLoginThunk } from '../../actions/authActions';
import { AppState } from '../../reducers';
import {
  selectorAuthIsLoggedIn,
  selectorAuthRequestData
} from '../../reducers/authReducer';

interface IProps {
  children?: React.ReactChild;
  active: Boolean;
  closeAction: Function;
}

const LoginBox = (props: IProps & stateToProps & dispatchToProps) => {
  const {
    children,
    active,
    closeAction,
    loginThunk,
    isLoggedIn,
    authLoading
  } = props;
  const loginBoxRef = React.createRef<HTMLDivElement>();
  const overlayRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    toggleLoginBox(loginBoxRef.current, active);
    toggleOverlay(overlayRef.current, active);
  }, [active]);

  useEffect(() => {
    if (isLoggedIn) {
      toggleLoginBox(loginBoxRef.current, false);
      toggleOverlay(overlayRef.current, false);
      closeAction();
    }
  }, [isLoggedIn]);

  const handleFacebookLogin = (data: any) => {
    const providerData: providerUserData = {
      providerId: data.id,
      name: data.name,
      email: data.email,
      userPic: data.picture.data.url,
      providerToken: data.signedRequest
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
        <Title size="small" align="center">
          Login
        </Title>

        {authLoading ? (
          <Loader />
        ) : (
          <SizedBox>
            <Fragment>
              <GoogleLoginBtn></GoogleLoginBtn>
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
        )}

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

interface stateToProps {
  isLoggedIn: Boolean;
  authLoading: Boolean;
}

interface dispatchToProps {
  loginThunk: Function;
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectorAuthIsLoggedIn(state),
  authLoading: selectorAuthRequestData(state).pending
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ActionTypes>
) => ({
  loginThunk: (provider: 'facebook' | 'google', userData: providerUserData) =>
    dispatch(authLoginThunk(provider, userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox);
