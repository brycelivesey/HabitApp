import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './register.module.css';
import { authService } from './services/auth.service';

interface RegisterCredentials {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        if (credentials.password !== credentials.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (credentials.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        // Add more validation as needed
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        if (!validateForm()) return;
    
        try {
          await authService.register({
            email: credentials.email,
            password: credentials.password
          });
          navigate('/');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Registration failed');
        }
      };

    return (
        <div className={styles.registerContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h3>Create Account</h3>

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
                    <div className={styles.passwordRequirements}>
                        Password must be at least 8 characters long
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <button type="submit" className={styles.registerButton}>
                    Create Account
                </button>

                <div className={styles.loginLink}>
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;