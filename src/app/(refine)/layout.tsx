'use client';

import { Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
import axios from 'axios';

// Create axios instance with auth headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create authenticated data provider
const customDataProvider = dataProvider('http://localhost:4000/api', axiosInstance);


export default function Layout({ children }: React.PropsWithChildren) {
  return (
      <Refine
        dataProvider={customDataProvider}
      >
        {children}
      </Refine>
  );
}