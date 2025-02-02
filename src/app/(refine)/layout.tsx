'use client';

import { Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';
import { config } from '@/app/config';

// Create axios instance with auth headers
const axiosInstance = axios.create({
  baseURL: config.baseURL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth-data') : null;
  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken.accessToken}`;
  }
  return config;
});

// Create authenticated data provider
const customDataProvider = dataProvider(config.baseURL + '/api', axiosInstance);


export default function Layout({ children }: React.PropsWithChildren) {
  return (
      <Refine
        dataProvider={customDataProvider}
      >
        {children}
      </Refine>
  );
}