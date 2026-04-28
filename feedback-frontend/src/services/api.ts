import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api';

export const submitFeedback = (message: string) => 
  axios.post(`${API_BASE_URL}/SubmitFeedback`, { message });

export const getFeedback = (token: string) => 
  axios.get(`${API_BASE_URL}/GetFeedback`, {
    headers: { Authorization: `Bearer ${token}` }
  });