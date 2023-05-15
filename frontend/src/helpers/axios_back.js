import axios from "axios"

const baseURL = "https://flowerknower-server.onrender.com/api/v1";

let headers = {};

if(localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
