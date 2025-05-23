import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // change if needed
  headers: { "Content-Type": "application/json" }
});

// Add token from localStorage (optional)
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000/api", // Ensure this matches your backend
//   timeout: 10000, // Add timeout to manage token
//   headers: { 
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
// });

// // Request interceptor
// API.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// // Response interceptor
// API.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response?.status === 401) {
//     // Handle unauthorized (e.g., redirect to login)
//     window.location.href = '/login';
//   }
//   return Promise.reject(error);
// });

export default API;