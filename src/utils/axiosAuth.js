import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  const getUrl = window.location;
  const currentUrl = getUrl.protocol + "//" + getUrl.host + "/";

  let baseURL;

  if (currentUrl === "http://localhost:3000/") {
    baseURL = "http://localhost:5000";
  } else if (currentUrl === "https://bgp-fe-staging.herokuapp.com/") {
    baseURL = "https://bgp-be-staging.herokuapp.com";
  } else if (
    currentUrl === "http://www.baseballgamepredictor.com/" ||
    currentUrl === "https://bgp-fe-production.herokuapp.com"
  ) {
    baseURL = "https://bgp-be-production.herokuapp.com";
  }

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: baseURL
  });
};
