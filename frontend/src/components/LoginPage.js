import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import loginimg from '../images/login.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess('Login successful!');
        setError('');

        // Store user data in session storage
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        sessionStorage.setItem('token', JSON.stringify(response.data.token));

        // Navigate based on the role
        const role = response.data.user.role;
        if (role === 'CUSTOMER') {
          navigate('/customerpage');
        } else if (role === 'OWNER') {
          navigate('/ownerpage');
        } else if (role === 'ADMIN') {
          navigate('/adminpage');
        }
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginimg})` }}
    >
      <div className="container max-w-lg mx-auto p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
        {error && (
          <div className="bg-red-600 text-white text-center p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg text-gray-300 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <Link to="/forgot-password" className="text-primary-dark mt-4 underline">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
