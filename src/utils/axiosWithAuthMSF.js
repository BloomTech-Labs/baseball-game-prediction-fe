import axios from 'axios';

export const axiosWithAuthMSF = () => {
  const authHeader = "db3310d2-eac9-403f-8943-7ac194:MYSPORTSFEEDS";
  const b64Header = window.btoa(authHeader);
  const auth = 'Basic ' + b64Header

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  });
};