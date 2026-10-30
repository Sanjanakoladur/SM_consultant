import axios from 'axios';
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1', withCredentials: true });
export const errMsg = (e) => e.response?.data?.message || 'Network error. Please try again.';
export const money = (n, t) => '₹' + Number(n).toLocaleString('en-IN') + (t === 'RENT' ? '/mo' : '');
export default api;
