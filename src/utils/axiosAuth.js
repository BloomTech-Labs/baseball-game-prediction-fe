import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "https://bgp-be-staging.herokuapp.com"
    // baseURL: "http://localhost:5000"
  });
};
