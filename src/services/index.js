import axios from 'axios';
import LRU from 'lru-cache';
import { makeUseAxios } from 'axios-hooks';

const apiClient = axios.create({
  baseURL: 'https://localhost:8000',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const cache = new LRU({ max: 10 });

export const useAxios = makeUseAxios({
  axios: apiClient
});

export default apiClient;
