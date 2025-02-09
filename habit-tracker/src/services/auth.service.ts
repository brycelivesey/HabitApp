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

    async refreshToken(): Promise<string | null> {
        try {
            const { data } = await api.post('/refresh', {}, {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
            localStorage.setItem('token', data.token);
            return data.token;
        } catch (error) {
            this.logout();
            throw new Error('Session expired. Please login again.');
        }
    },

    async makeAuthenticatedRequest<T>(request: () => Promise<T>): Promise<T> {
        try {
            return await request();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                try {
                    // Try to refresh the token
                    await this.refreshToken();
                    // Retry the original request
                    return await request();
                } catch (refreshError) {
                    // If refresh fails, throw error
                    this.logout();
                    throw new Error('Session expired. Please login again.');
                }
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