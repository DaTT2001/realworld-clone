import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.realworld.io/api',
  responseType: 'json',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
});