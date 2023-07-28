import axios from 'axios';
import { getAccessToken } from '../utils';
export const axiosClient = axios.create({
  baseURL: 'https://api.realworld.io/api',
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if(accessToken !== undefined) {
    const accessHeaders = `Bearer ${accessToken}`;
    if (config.headers !== undefined) {
      config.headers.Authorization = accessHeaders;
    }
  }
  return config;
});
