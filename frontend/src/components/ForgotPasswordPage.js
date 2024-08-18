import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginimg from '../images/login.jpg';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });

      if (response.status === 200) {
        setMessage('Temporary password sent to your email.');
        setError('');
        setTimeout(() => {
          navigate('/update-password');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginimg})` }}
    >
      <div className="container max-w-lg mx-auto p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        {error && (
          <div className="bg-red-600 text-white text-center p-3 rounded mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-600 text-white text-center p-3 rounded mb-4">
            {message}
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
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });

//       if (response.status === 200) {
//         setMessage('Temporary password sent to your email.');
//         setError('');
//         setTimeout(() => {
//           navigate('/update-password');
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="container mx-auto flex flex-col items-center justify-center py-16 px-4">
//       <h2 className="text-3xl font-serif font-bold text-primary-dark mb-6">Forgot Password</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {message && <p className="text-green-500 mb-4">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
//         <div>
//           <label htmlFor="email" className="block text-lg text-gray-700">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-dark"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-primary-dark text-white font-bold rounded-md hover:bg-primary-dark-dark"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPasswordPage;
