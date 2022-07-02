import React, { ReactNode, useCallback, useEffect, useReducer } from 'react';
import * as types from './auth-types';
import AuthContext from './authContext';
import authReducer from './authReducer';

interface Props {
    children: ReactNode;
}

export interface RegisterProps {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

type UserType = {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
} | null;

export interface AuthState {
    isLoggedIn: boolean;
    user: UserType;
    token: null | string;
    loading: boolean;
    error: null | string;
}

export const AUTH_STATE: AuthState = {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_STATE);

    const getLoggedInUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('reii414-token');

            if (!token) {
                return;
            }

            const res = await fetch('http://localhost:1337/api/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                dispatch({
                    type: types.AUTH_GET_USER_FAIL,
                    payload: 'Something went wrong',
                });
                return;
            }

            const userData = await res.json();

            dispatch({
                type: types.AUTH_GET_USER_SUCCESS,
                payload: {
                    user: userData,
                    token,
                },
            });
        } catch (error) {
            dispatch({
                type: types.AUTH_GET_USER_FAIL,
                payload: 'Something went wrong',
            });
        }
    }, []);

    const register = async (data: RegisterProps) => {
        try {
            dispatch({ type: types.AUTH_REGISTER_LOADING });

            const res = await fetch(
                'http://localhost:1337/api/auth/local/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        phoneNumber: data.phoneNumber,
                    }),
                }
            );

            if (!res.ok) {
                return;
            }

            const userData = await res.json();

            dispatch({
                type: types.AUTH_REGISTER_SUCCESS,
                payload: {
                    user: userData.user,
                    token: userData.jwt,
                },
            });

            localStorage.setItem('reii414-token', userData.jwt);
        } catch (error) {
            const errorMessage = 'Something went wrong';
            dispatch({ type: types.AUTH_REGISTER_FAIL, payload: errorMessage });
        }
    };

    const login = async (data: LoginProps) => {
        try {
            dispatch({ type: types.AUTH_LOGIN_LOADING });

            // HTTP SERVICE TO LOGIN
            const res = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: data.email,
                    password: data.password,
                }),
            });

            if (!res.ok) {
                return;
            }

            const userData = await res.json();

            dispatch({
                type: types.AUTH_LOGIN_SUCCESS,
                payload: {
                    token: userData.jwt,
                    user: userData.user,
                },
            });

            localStorage.setItem('reii414-token', userData.jwt);
        } catch (error) {
            const errorMessage = 'Something went wrong';
            dispatch({ type: types.AUTH_LOGIN_FAIL, payload: errorMessage });
        }
    };

    const logout = async () => {
        localStorage.removeItem('reii414-token');
        dispatch({ type: types.AUTH_LOGOUT });
    };

    const authContextValues = {
        register,
        login,
        logout,
        getLoggedInUser,
        ...state,
    };

    useEffect(() => {
        getLoggedInUser();
    }, [getLoggedInUser]);

    return (
        <AuthContext.Provider value={authContextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
