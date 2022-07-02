import { createContext } from 'react';
import {
    AuthState,
    AUTH_STATE,
    LoginProps,
    RegisterProps,
} from './AuthProvider';

interface AuthContext extends AuthState {
    register: (obj: RegisterProps) => Promise<void>;
    login: (obj: LoginProps) => Promise<void>;
    logout: () => void;
    getLoggedInUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
    ...AUTH_STATE,
    register: async (obj: RegisterProps) => {},
    login: async (obj: LoginProps) => {},
    logout: () => {},
    getLoggedInUser: async () => {},
});

export default AuthContext;
