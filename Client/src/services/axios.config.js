import axios from 'axios';
const API_URL = 'http://localhost:4000/api';
 const axiosInstance = axios.create({
    baseURL: API_URL,
   
    timeout : 10000,
    withCredentials: true 
});
export default axiosInstance;

