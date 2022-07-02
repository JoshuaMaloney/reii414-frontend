import * as types from './auth-types';
import { AuthState } from './AuthProvider';

export default function authReducer(state: AuthState, action: any) {
    switch (action.type) {
        case types.AUTH_LOGIN_FAIL:
        case types.AUTH_REGISTER_FAIL:
        case types.AUTH_GET_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case types.AUTH_LOGIN_LOADING:
        case types.AUTH_REGISTER_LOADING:
            return {
                ...state,
                loading: true,
            };

        case types.AUTH_LOGIN_SUCCESS:
        case types.AUTH_REGISTER_SUCCESS:
        case types.AUTH_GET_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
                loading: false,
                error: null,
            };

        case types.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
}
