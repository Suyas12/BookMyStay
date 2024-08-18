import React from 'react';
import contactimg from '../images/contact.jpg';

function ContactPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center"
      style={{ backgroundImage:`url(${contactimg})` }}
    >
      <div className="container max-w-lg mx-auto p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-4xl font-serif font-bold text-yellow-500 mb-6 text-center">
          Contact Us
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300">Name:</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">Email:</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg text-gray-300">Message:</label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
