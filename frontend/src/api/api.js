import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

//interceptor is used to add token to every request
// Interceptor to add token to requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle expired/invalid token
            localStorage.removeItem("token");
            // window.location.href = "/login"; // Or show a toast
        }
        return Promise.reject(error);
    }
);

export default API;