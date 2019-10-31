import axios from "axios";

export const axiosWithAuthMSF = () => {
  const authHeader = `${process.env.REACT_APP_MSF_API_KEY}:MYSPORTSFEEDS`;
  const b64Header = window.btoa(authHeader);
  const auth = "Basic " + b64Header;

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  });
};
