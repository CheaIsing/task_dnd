import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Your backend URL
    withCredentials: true, // This is crucial for sending cookies
  });

export { axiosInstance };
