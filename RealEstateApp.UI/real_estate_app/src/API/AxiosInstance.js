import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5216/api',
});


// Request Interceptor: Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("entered here")

            localStorage.removeItem('authToken');
            window.location.href = "/login";

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
