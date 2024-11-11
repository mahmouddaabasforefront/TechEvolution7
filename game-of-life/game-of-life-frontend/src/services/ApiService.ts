import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchGridApi = async () => {
  return await axios.get(`${API_BASE_URL}/grid`);
};

export const randomizeGrid = async () => {
  return await axios.post(`${API_BASE_URL}/randomize`);
};

export const runGameApi = async (grid: number[][]) => {
  return await axios.post(`${API_BASE_URL}/run`, { grid });
};

export const clearGridApi = async () => {
  return await axios.post(`${API_BASE_URL}/clear`);
};