import { config } from '@/app/config';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: config.baseURL,
});
