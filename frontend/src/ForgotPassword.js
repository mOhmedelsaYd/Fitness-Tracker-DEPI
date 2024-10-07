// src/ForgotPassword.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import CSS for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log('Reset link sent to:', email);
        // Add logic to send reset password email
    };

    return (
        <div className="login-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
                <Link to="/">Remembered your password? Login</Link>
            </form>
        </div>
    );
};

export default ForgotPassword;
