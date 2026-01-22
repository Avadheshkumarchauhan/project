
import axios from 'axios';

const BASE_URLs = "http://localhost:5014/api/v1";
const BASE_URL = "https://avadheshkumarchauhan-lms-backend.vercel.app/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.baseURL = BASE_URLs;
axiosInstance.defaults.withCredentials = true;
 

export default axiosInstance;

