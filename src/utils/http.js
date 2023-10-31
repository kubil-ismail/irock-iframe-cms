import axios from "axios";
import rateLimit from "axios-rate-limit";
import Swal from "sweetalert2";

const http = rateLimit(
  axios.create({
    // baseURL: "https://dev.cms.abracadabra-starquest.events/api",
    // baseURL: "https://cms-aeo.test/api",
    baseURL: process.env.REACT_APP_BASE_API_URL || 'https://dev.cms.abracadabra-starquest.events/api',
  }),
  {
    maxRequests: 2,
    perMilliseconds: 1000,
    maxRPS: 2,
  }
  );

const token = localStorage.getItem("token") || null; // your auth token

if (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errMsg = error?.response?.data?.messages;

    Swal.fire({
      title: "",
      html: errMsg ?? "Something wrong with our system...",
      icon: "error",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
    return Promise.reject(error);
  }
);

export default http;
