import type React from 'react';
import { type FC, useEffect, useRef, useState } from 'react';

import axios, { type AxiosInstance } from 'axios';

import createCtx from './ctx';

export type InitialProps = {
  children: React.ReactElement;
};
export const [useApiClientContext, ApiClientProvider] =
  createCtx<AxiosInstance>();

const ApiClientContextProvider: FC<InitialProps> = ({ children }) => {
  const instanceRef = useRef(
    axios.create({
      baseURL: 'http://127.0.0.1:9000',
    })
  );

  useEffect(() => {
    const axiosInstance = instanceRef.current;
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <ApiClientProvider value={instanceRef.current}>
      {children}
    </ApiClientProvider>
  );
};

export default ApiClientContextProvider;
