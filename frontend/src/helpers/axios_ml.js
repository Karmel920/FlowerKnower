import axios from "axios"

const baseURL = process.env.REACT_APP_API_ML_BASE_URL;

let headers = {};

if(localStorage.token) {
  headeers.Authorization = `Bearer ${localStorage.token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
