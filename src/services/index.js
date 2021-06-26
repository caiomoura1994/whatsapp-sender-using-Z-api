import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://us-central1-zapei-chat.cloudfunctions.net',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
