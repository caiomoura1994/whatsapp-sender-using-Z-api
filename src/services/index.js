import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://auto-zap-bot.herokuapp.com',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
