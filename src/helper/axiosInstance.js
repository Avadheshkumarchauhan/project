
import axios from 'axios';
//https://avadheshkumarchauhan-backproject-ben10j2kp.vercel.app
//const BASE_URL = "http://localhost:5014/api/v1";
const BASE_URL = "https://avadheshkumarchauhan-backproject-ben10j2kp.vercel.app/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
 

export default axiosInstance;

