import Cookie from 'js-cookie';
import axios from 'axios';
import { userData } from '../types/userData';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const saveToken = (token: string) => {
  Cookie.set('authToken', token);
};

export const deleteToken = () => {
  Cookie.remove('authToken');
};

export const fetchToken = (): string | undefined => {
  return Cookie.get('authToken');
};

export const getAuthHeaders = () => {
  return { headers: { Authorization: `Bearer ${fetchToken()}` } };
};

export const updateToken = (): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${fetchToken()}`;
};

export const verifyToken = (token: string): Boolean => {
  const nowInEpoch = Math.round(new Date().getTime() / 1000);

  const decoded = jwt.decode(token);

  const isTokenValid = decoded ? _.get(decoded, 'exp') > nowInEpoch : false;

  return isTokenValid;
};

export const decodeToken = (token: string): userData => {
  const decoded = jwt.decode(token);

  return {
    userName: _.get(decoded, 'name'),
    userEmail: _.get(decoded, 'email'),
    userPic: _.get(decoded, 'photo'),
    userOrders: [],
    userAddresses: [],
    isAdmin: decoded ? _.get(decoded, 'isAdmin') : false,
    isLoggedIn: verifyToken(token)
  };
};
