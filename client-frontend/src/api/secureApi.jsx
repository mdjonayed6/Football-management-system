import axios from 'axios';

const secureApi = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // Your API base URL
});

// Request interceptor to set common headers
secureApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    // Add any other common headers if needed
    return config;
});

// Response interceptor to handle errors
secureApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);

export default secureApi;