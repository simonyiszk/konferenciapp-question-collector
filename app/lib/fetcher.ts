import axios from 'axios';
import { signOut } from 'next-auth/react';

const axiosService = axios.create();
axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  },
);

export const axiosGet = async <T>(url: string) => {
  const response = await axiosService.get<T>(url);
  return response.data;
};

export const axiosPost = async <TResponse, TBody>(
  url: string,
  data: { arg: TBody },
) => {
  const response = await axiosService.post<TResponse>(url, data.arg);
  return response.data;
};

export const axiosPut = async <TResponse, TBody>(
  url: string,
  data: { arg: TBody },
) => {
  const response = await axiosService.put<TResponse>(url, data.arg);
  return response.data;
};

export const axiosDelete = async <TResponse = any>(url: string) => {
  const response = await axiosService.delete<TResponse>(url);
  return response.data;
};
