import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

const customApi = axios.create({
  baseURL: BASE_URL,
});

customApi.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

customApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.config?.url?.includes("/api/user/refresh-token")) {
        console.log("Refresh token expired or invalid → logout user");
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // hoặc chuyển sang trang đăng nhập
        return Promise.reject(error);
      }

      if (!error.config?.url?.includes("/api/user/refresh-token") && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const refreshToken = localStorage.getItem('refreshToken');
              const res = await axios.post('http://localhost:8081/api/user/refresh-token', {
                "refreshToken": refreshToken
              });

              const newAccessToken = res.data.token;
              localStorage.setItem('jwt', newAccessToken);
              console.log("Renew access token: ", newAccessToken);
      
              customApi.defaults.headers.common[
                  "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return customApi(originalRequest);
          } catch (error) {
            console.log("Refresh token expired or invalid → logout");
            localStorage.removeItem("jwt");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
      }
      return Promise.reject(error);
    }
);

export default customApi;