import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    userId: string;
}

const api = axios.create({
    baseURL: '/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post('/login', credentials);
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {

            if (axios.isAxiosError(error)) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.data);
            console.log(error.response?.data?.error);
                throw new Error(error.response?.data?.error || 'Login failed. Please try again later.');
            }
            throw error;
        }
    },
    
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post('/register', credentials);
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Registration failed. Please try again later.');
            }
            throw error;            
        }
    },

    logout(): void {
        localStorage.removeItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};