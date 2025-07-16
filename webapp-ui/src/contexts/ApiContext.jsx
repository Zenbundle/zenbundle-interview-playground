import axios from 'axios';
import { decamelizeKeys } from 'humps';
import Cookies from 'js-cookie';
import React, { createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AccountApi } from '../apis/AccountApi';
import { DeliveryApi } from '../apis/DeliveryApi.js';

export const ApiContext = createContext({
  deliveryApi: null,
});

export const setCsrfTokenCookie = (csrfToken) => {
  Cookies.set('csrf-token', csrfToken, {
    expires: 30, // 30 days
    path: '/',
    sameSite: 'strict',
    secure: true,
  });
};

export const getCsrfTokenCookie = () => {
  return Cookies.get('csrf-token');
};

export const addCsrfTokenToUrl = (url, organization) => {
  const newUrl = new URL(url);
  const csrfToken = getCsrfTokenCookie(organization);

  if (csrfToken) {
    const params = new URLSearchParams(newUrl.search);
    params.append('csrfToken', csrfToken);
    newUrl.search = params.toString();
  }

  return newUrl.toString();
};

export const ApiProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    const csrfToken = getCsrfTokenCookie();

    if (csrfToken) {
      config.headers['X-Csrf-Token'] = csrfToken;
    }

    if (config.params) {
      config.params = decamelizeKeys(config.params);
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      // Get the CSRF Token when present in the response header
      const csrfToken = response.headers['x-csrf-token'];

      if (csrfToken) {
        setCsrfTokenCookie(csrfToken);
      }

      return response;
    },
    (error) =>
      Promise.reject(
        (error.response && error.response.data) || {
          detail: 'Internal server error',
        },
      ),
  );

  useEffect(() => {
    // Parse query params from location.search
    const searchParams = new URLSearchParams(location.search);
    const csrfToken = searchParams.get('csrfToken');

    if (csrfToken) {
      setCsrfTokenCookie(csrfToken);

      // Remove the token from the URL
      searchParams.delete('csrfToken');
      const newSearch = searchParams.toString();

      navigate(
        {
          pathname: location.pathname,
          search: newSearch ? `?${newSearch}` : '',
        },
        { replace: true },
      );
    }
  }, [location.search, location.pathname, navigate]);

  return (
    <ApiContext.Provider
      value={{
        accountApi: new AccountApi(axiosInstance),
        deliveryApi: new DeliveryApi(axiosInstance),
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
