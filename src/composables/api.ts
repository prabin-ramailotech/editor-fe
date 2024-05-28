import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({});

api.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const token = Cookies.get('go_rules_token');

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      window.location.href = '/login';
    }

    return config;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/login';
    } else if (error.response && error.response.status === 500) {
      message.error('505 Internal Server Error');
    }
    return Promise.reject(error);
  },
);

export default api;
