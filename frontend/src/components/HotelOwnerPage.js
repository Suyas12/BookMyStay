import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authHeader from '../service/auth-header';
import loginimg from '../images/login.jpg';

const HotelOwnerPage = () => {
  const [owner, setOwner] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ hotelname: '', city: '', state: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const ownerId = JSON.parse(sessionStorage.getItem('user')).userId;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/owner/profile/${ownerId}`,{ headers: authHeader() })
      .then(response => setOwner(response.data))
      .catch(() => setError('Error fetching owner profile'));

    axios.get(`http://localhost:8080/owner/hotels/${ownerId}`,{ headers: authHeader() })
      .then(response => setHotels(response.data))
      .catch(() => setError('Error fetching owner hotels'));

    axios.get('http://localhost:8080/customer/states',{ headers: authHeader() })
      .then(response => setStates(response.data))
      .catch(() => setError('Error fetching states'));

  }, [ownerId]);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:8080/customer/city/${selectedState}`,{ headers: authHeader() })
        .then(response => setCities(response.data))
        .catch(() => setError('Error fetching cities'));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleAddHotel = () => {
    axios.post('http://localhost:8080/owner/add-hotel', {
      hotelname: newHotel.hotelname,
      city: { code: newHotel.city },
      state: { code: newHotel.state },
      owner: { userId: ownerId }
    },{ headers: authHeader() })
      .then(response => {
        setHotels([...hotels, response.data]);
        setNewHotel({ hotelname: '', city: '', state: '' });
        setSuccess('Hotel added successfully');
        sessionStorage.setItem('owner', JSON.stringify(response.data));
      })
      .catch(() => setError('Error adding hotel'));
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setNewHotel({ ...newHotel, state: e.target.value, city: '' });
  };

  const handleCityChange = (e) => {
    setNewHotel({ ...newHotel, city: e.target.value });
  };

  const handleViewBookings = (hotel) => {
    sessionStorage.setItem("hotel", JSON.stringify(hotel));
    navigate("/bookings");
  };

  const handleManageRooms = (hotel) => {
    sessionStorage.setItem("hotel", JSON.stringify(hotel));
    navigate("/manage-rooms");
  };

  if (!owner) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20 flex bg-cover bg-center bg-no-repeat"   style={{ backgroundImage: `url(${loginimg})` }}>
      {/* Right-side narrow strip for profile */}
      <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg mx-10 bg-opacity-70">
        <h2 className="text-3xl font-bold mb-4">Owner Profile</h2>
        <p><strong>First Name:</strong> {owner.firstname}</p>
        <p><strong>Last Name:</strong> {owner.lastname}</p>
        <p><strong>Email:</strong> {owner.email}</p>
        <p><strong>Phone:</strong> {owner.phone}</p>
      </div>

      {/* Main content for hotels and add hotel form */}
      <div className="flex-1 ml-8">
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg mx-10 bg-opacity-70">
          <h2 className="text-2xl font-semibold mb-4">My Hotels</h2>
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
          {hotels.length === 0 ? (
            <p>No hotels found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <div key={hotel.hotelid} className="bg-gray-700 shadow-lg rounded-lg p-4 text-gray-200">
                  <h3 className="text-lg font-semibold mb-2">{hotel.hotelname}</h3>
                  <p className="mb-1"><strong>City:</strong> {hotel.city.name}</p>
                  <p><strong>State:</strong> {hotel.state.name}</p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleViewBookings(hotel)}
                      className="py-2 px-4 bg-primary-dark text-white rounded-md hover:bg-primary-dark-dark"
                    >
                      View Bookings
                    </button>
                    <button
                      onClick={() => handleManageRooms(hotel)}
                      className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Manage Rooms
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-10 bg-opacity-70">
          <h2 className="text-2xl font-semibold mb-4">Add New Hotel</h2>
          <input
            type="text"
            placeholder="Hotel Name"
            value={newHotel.hotelname}
            onChange={(e) => setNewHotel({ ...newHotel, hotelname: e.target.value })}
            className="block w-full px-4 py-2 mb-4 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
          />
          <div className="mb-4">
            <label htmlFor="state" className="block text-lg text-gray-300 mb-1">State:</label>
            <select
              id="state"
              name="state"
              value={newHotel.state}
              onChange={handleStateChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="city" className="block text-lg text-gray-300 mb-1">City:</label>
            <select
              id="city"
              name="city"
              value={newHotel.city}
              onChange={handleCityChange}
              className="block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              required
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.code} value={city.code}>{city.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddHotel}
            className="w-full py-2 bg-primary-dark text-white rounded-md hover:bg-primary-dark-dark"
          >
            Add Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerPage;
