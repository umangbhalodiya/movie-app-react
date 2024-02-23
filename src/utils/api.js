import axios from "axios";


import { BASE_URL , API_HOST, API_KEY} from "../config";

export const getToken = (key = "access_token") =>
  sessionStorage.getItem(key) ||
  localStorage.getItem(key) ||
  undefined;

function makeHeaders() {
  let headerObj = {};
    headerObj = {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    };
  return headerObj;
}

const axiosApi = axios.create({
  baseURL: `${BASE_URL}/`,
});

axiosApi.interceptors.request.use((request) => {
  if (!request.ignoreAuth) {
    request.headers = makeHeaders();
  }
  return request;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (err) => {
    const errorCode =
      err?.response && err?.response?.data && err?.response?.data.code;
    const errorMessage =
      err?.response &&
      err?.response?.data &&
      err?.response?.data?.message &&
      err?.response?.data?.message?.email;
    if (errorCode === 404 && errorMessage === "Account does not exist") {
      window.location = "/?unAuthorisedUser=true";
    } else if (err?.response && err?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location = "/sign-in";
      return true;
    }
    if (err?.response && err?.response?.status === 403) {
      // showNotification(err?.response?.data?.msg, 'error', 5000);
    }
    if (err?.response && err?.response?.status === 500) {
      // showNotification('Unknown server error', 'error', 5000);
    }
    return Promise.reject(err);
  }
);

export default axiosApi;
