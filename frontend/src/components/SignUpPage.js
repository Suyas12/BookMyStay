import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import signupimg from '../images/signup.jpg';


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    rePassword: '',
    email: '',
    phone: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.');
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      setError('Invalid phone number');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    try {
      const url = 'http://localhost:8080/auth/register';
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess(response.data.message);
        setError('');
        // Delay navigation to allow success message to be visible
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${signupimg})` }}
  >
    <div className="container max-w-lg mx-auto p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
      {error && (
        <div className="bg-red-600 text-white text-center p-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-600 text-white text-center p-3 rounded mb-4">
          {success}
        </div>
      )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstname" className="block text-lg">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-lg">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label htmlFor="rePassword" className="block text-lg">Re-enter Password:</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg">I am a:</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="customer"
                name="role"
                value="CUSTOMER"
                checked={formData.role === 'CUSTOMER'}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="customer" className="mr-4">Customer</label>
              <input
                type="radio"
                id="owner"
                name="role"
                value="OWNER"
                checked={formData.role === 'OWNER'}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="owner">Hotel Owner</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
