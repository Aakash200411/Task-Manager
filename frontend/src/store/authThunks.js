import { authAPI } from '../services/api';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const response = await authAPI.register(userData);
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
    }
};

export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const response = await authAPI.login(credentials);
        localStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
}; 