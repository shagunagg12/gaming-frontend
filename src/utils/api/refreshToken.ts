// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://your-backend-url',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,  // Ensures cookies are sent with cross-origin requests
// });

// // Interceptor to add the access token to the request headers (but no need to manually attach token anymore)
// api.interceptors.request.use((config) => {
//   return config;
// }, (error) => Promise.reject(error));

// // Interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If the access token is expired and not already refreshing
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Request the backend to refresh the token using the refresh_token stored in HttpOnly cookies
//         const response = await api.post('/refresh-token'); // Your API endpoint for refreshing tokens
        
//         // Retry the original request with the new token (it's handled by the backend)
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed', refreshError);
//         // Redirect to login or handle token expiration
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
