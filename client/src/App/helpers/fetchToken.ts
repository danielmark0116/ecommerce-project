import Cookie from 'js-cookie';
import axios from 'axios';

export const saveToken = (token: string) => {
  Cookie.set('authToken', token);
};

export const fetchToken = () => {
  return Cookie.get('authToken');
};

export const getAuthHeaders = () => {
  return { headers: { Authorization: `Bearer ${fetchToken()}` } };
};

export const updateToken = (): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${fetchToken()}`;
};
