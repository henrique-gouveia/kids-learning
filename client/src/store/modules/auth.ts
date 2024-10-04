import api from '@/services/api';

export interface AuthState {
    id?: number,
    nome?: string,
    email?: string,
    admin?: boolean,
    iat?: number,
    exp?: number,
    token?: string,
    validatingToken?: boolean
}

const AuthModule = {
    state: {
        admin: false,
        validatingToken: true
    },
    getters: {
        getAuth(state: AuthState): AuthState {
            return state;
        }
    },
    mutations: {
        setAuthData(state: AuthState, authData: any): void {
            const {
                id = null,
                nome = null,
                email = null,
                admin = false,
                iat = null,
                exp = null,
                token = null
            } = authData || {};

            state.id = id;
            state.nome = nome;
            state.email = email;
            state.admin = admin;
            state.iat = iat;
            state.exp = exp;
            state.token = token;

            if (token) {
                api.defaults.headers.common['Authorization'] = `bearer ${token}`;
            } else {
                delete api.defaults.headers.common['Authorization'];
            }
        },
        setValidatingToken(state: AuthState, value: boolean): void {
            state.validatingToken = value;
        }
    }
}

export default AuthModule;
