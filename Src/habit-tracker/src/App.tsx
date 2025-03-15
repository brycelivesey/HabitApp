import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { authService } from './services/auth.service';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        if (!location.state?.justLoggedIn) {
          await authService.refreshToken();
        }
        // setIsLoading(false);
      } catch (error) {
        navigate('/login');
      }
    };

    checkAuth();

    // Set up periodic token refresh (every 45 minutes)
    const refreshInterval = setInterval(async () => {
      try {
        await authService.refreshToken();
      } catch (error) {
        navigate('/login');
      }
    }, 45 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [navigate]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // Or your loading component
  // }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;