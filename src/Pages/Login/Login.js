import React, { useState } from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state to handle loading indicator

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        try {
            const response = await axios.post('/api/users/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true); // Set isLoggedIn to true after successful login
        } catch (error) {
            alert('Error logging in');
        }
        setLoading(false); // Set loading back to false after response
    };

    if (isLoggedIn) {
        return <Redirect to="/home" />; // Redirect to home if logged in
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <Link to="/signup">
                <button>Sign up</button>
            </Link>
        </div>
    );
};

export default Login;
