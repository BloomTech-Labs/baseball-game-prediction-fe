import axios from "axios";

let env = process.env.NODE_ENV;

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  let baseURL;

  if (env === "development") {
    baseURL = "http://localhost:5000";
  } else if (env === "staging") {
    baseURL = "https://bgp-be-staging.herokuapp.com";
  }

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: baseURL
  });
};
