import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO LOGOUT WHEN EXPIRED

export default api;
