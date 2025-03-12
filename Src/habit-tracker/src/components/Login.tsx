import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { authService } from '../services/auth.service';

interface LoginCredentials {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        try {
          await authService.login(credentials);
          navigate('/', { state: { justLoggedIn: true } });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Login failed');
        }
      };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <button type="submit" className={styles.loginButton}>
                    Login
                </button>

                <div className={styles.loginLink}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;