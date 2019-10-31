import axios from 'axios';

const apiKey = process.env.REACT_APP_MSF_API_KEY;

export const axiosWithAuthMSF = () => {
  const authHeader = `${apiKey}:MYSPORTSFEEDS`;
  console.log(authHeader);
  const b64Header = window.btoa(authHeader);
  const auth = 'Basic ' + b64Header

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  });
};