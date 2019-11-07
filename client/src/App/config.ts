export const devToolsMode = false;
export const API_URL =
  process.env.REACT_APP_MODE === 'development'
    ? 'http://localhost:8000/api'
    : '';
