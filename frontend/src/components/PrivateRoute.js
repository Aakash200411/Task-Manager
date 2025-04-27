import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    // Fallback: check localStorage for token if Redux state is lost
    const auth = isAuthenticated || !!localStorage.getItem('token');
    console.log('PrivateRoute: isAuthenticated:', isAuthenticated, 'token:', token, 'auth:', auth);
    return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 