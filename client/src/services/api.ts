import axios from "axios"

// const success = res => res;
// const error = err => {
//     if (401 === err.response.status) {
//         window.location.replace('/');
//     } else {
//         return Promise.reject(err);
//     }
// }

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

// api.interceptors.response.use(success, error);

export default api;
