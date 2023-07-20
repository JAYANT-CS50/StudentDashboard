import axios from 'axios';
import qs from 'qs';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/dashboard/',
});

// Add an interceptor to handle expired access tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Add the access token to the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the response status is 401 (unauthorized) indicating an expired access token
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Make a request to the token refresh endpoint with the refresh token
          const response = await axiosInstance.post(
            'api/token/refresh/',
            qs.stringify({ refresh: refreshToken }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          // Store the new access token in the local storage or Redux store
          const newAccessToken = response.data.access;
          localStorage.setItem('accessToken', newAccessToken);

          // Update the original request headers with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Set the _retry flag to indicate that the request has been retried
          originalRequest._retry = true;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle the error if token refresh fails
          console.log('Token refresh failed:', refreshError);
          // Redirect to the login page or perform any other necessary actions
        }
      } else {
        // No refresh token available, redirect to the login page or perform any other necessary actions
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
