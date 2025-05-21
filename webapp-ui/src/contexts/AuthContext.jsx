import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

import { useApi } from '../hooks/useApi';

const initialState = {
  isRequesting: true,
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const handlers = {
  REQUEST_PENDING: (state) => ({
    ...state,
    isRequesting: true,
  }),
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isRequesting: false,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isRequesting: false,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  VERIFY: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isRequesting: false,
      isAuthenticated: true,
      user,
    };
  },
  UPDATE_PROFILE: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext({
  ...initialState,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }) => {
  const { accountApi } = useApi();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        dispatch({ type: 'REQUEST_PENDING' });
        const user = await accountApi.fetchProfile?.({ validateCsrfToken: true });
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: !!user,
            user: user || null,
          },
        });
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'REQUEST_PENDING' });
    const user = await accountApi.login(email, password);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await accountApi.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (firstName, lastName, email, password) => {
    dispatch({ type: 'REQUEST_PENDING' });
    const user = await accountApi.register(firstName, lastName, email, password);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
