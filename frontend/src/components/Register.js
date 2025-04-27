import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear validation error when user types
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registration form submitted:', formData);
        
        // Validate password length
        if (formData.password.length < 8) {
            setValidationError('Password must be at least 8 characters long');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }
        
        try {
            console.log('Dispatching register action...');
            const result = await dispatch(registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }));
            console.log('Registration result:', result);
            
            if (result.type === 'auth/register/fulfilled') {
                toast.success('Registration successful!');
                console.log('Registration successful, navigating to home...');
                navigate('/');
            } else {
                toast.error(result.payload?.message || 'Registration failed');
            }
        } catch (err) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Register</h2>
                            {(error || validationError) && (
                                <div className="alert alert-danger" role="alert">
                                    {error || validationError}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                    />
                                    <small className="text-muted">Password must be at least 8 characters long</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p>
                                    Already have an account?{' '}
                                    <a href="/login">Login here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 