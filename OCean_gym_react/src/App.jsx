import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password,
            });
            console.log('Login successful:', response.data);
            // Aquí puedes manejar el estado del usuario, redireccionar, etc.
        } catch (error) {
            console.error('Error logging in:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
