import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../service/auth-header';

const CheckInForm = () => {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    numPersons: '',
    state: '',
    city: ''
  });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer/states',{ headers: authHeader() });
        setStates(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching states');
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await axios.get(`http://localhost:8080/customer/city/${formData.state}`,{ headers: authHeader() });
          setCities(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'An error occurred while fetching cities');
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm(name, value);
  };

  const validateForm = (name, value) => {
    let errors = {};
    const checkinDate = new Date(formData.checkin);
    const today = new Date();

    if (name === 'checkin' || name === 'checkout') {
      if (name === 'checkin') {
        if (value && new Date(value) < today.setHours(0, 0, 0, 0)) {
          errors.checkin = 'Check-in date must be today or in the future.';
        } else {
          errors.checkin = '';
        }
      }

      if (name === 'checkout') {
        if (value && new Date(value) <= checkinDate) {
          errors.checkout = 'Check-out date must be after check-in date.';
        } else {
          errors.checkout = '';
        }
      }
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);

    if (checkinDate < new Date().setHours(0, 0, 0, 0)) {
      setFormErrors({ ...formErrors, checkin: 'Check-in date must be today or in the future.' });
      return;
    }

    if (checkoutDate <= checkinDate) {
      setFormErrors({ ...formErrors, checkout: 'Check-out date must be after check-in date.' });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/customer/hotels?state=${formData.state}&city=${formData.city}`,{ headers: authHeader() });
      setHotels(response.data);
      setError('');
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleBookClick = (hotel) => {
    sessionStorage.setItem('selectedHotel', JSON.stringify({
      ...hotel,
      checkin: formData.checkin,
      checkout: formData.checkout,
      numPersons: formData.numPersons
    }));
    navigate("/hotel");
  };

  return (
    <div className="bg-gray-900 text-gray-100 bg-opacity-70  p-4" >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md bg-opacity-70">
          <h2 className="text-2xl font-bold mb-4">Search Hotels</h2>
          <div>
            <label htmlFor="checkin" className="block text-lg text-gray-300">Check-In Date:</label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.checkin ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-gray-200`}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            {formErrors.checkin && <p className="text-red-500 mt-1">{formErrors.checkin}</p>}
          </div>
          <div>
            <label htmlFor="checkout" className="block text-lg text-gray-300">Check-Out Date:</label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.checkout ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-gray-200`}
              min={formData.checkin || new Date().toISOString().split('T')[0]}
              required
            />
            {formErrors.checkout && <p className="text-red-500 mt-1">{formErrors.checkout}</p>}
          </div>
          <div>
            <label htmlFor="numPersons" className="block text-lg text-gray-300">Number of Persons:</label>
            <input
              type="number"
              id="numPersons"
              name="numPersons"
              value={formData.numPersons}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-lg text-gray-300">State:</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-lg text-gray-300">City:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
              required
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.length ? (
                cities.map((city) => (
                  <option key={city.code} value={city.code}>{city.name}</option>
                ))
              ) : (
                <option value="" disabled>No cities available</option>
              )}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Search Hotels
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      ) : (
        <div className="mt-6 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Available Hotels:</h3>
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.hotelid} className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold text-white mb-2">{hotel.hotelname}</h4>
                  <p className="text-gray-400"><strong>Owner:</strong> {hotel.owner}</p>
                  <p className="text-gray-400"><strong>Contact:</strong> {hotel.contact}</p>
                  <p className="text-gray-400"><strong>Address:</strong> {hotel.address}, {hotel.city}, {hotel.state}</p>
                  <button
                    onClick={() => handleBookClick(hotel)}
                    className="mt-4 w-full py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hotels available for the selected location and dates.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckInForm;
