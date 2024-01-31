import axios from 'axios';    

const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5555',
  baseURL: 'http://3.107.0.200:5555',
});

export default axiosInstance;