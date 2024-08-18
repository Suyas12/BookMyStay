import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authHeader from '../service/auth-header';
import hotelimg from '../images/hotel.jpg';


const HotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({ checkin: '', checkout: '', numPersons: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const hotelData = JSON.parse(sessionStorage.getItem('selectedHotel'));

    if (hotelData) {
      setHotel(hotelData);
      setBookingDetails({
        checkin: hotelData.checkin,
        checkout: hotelData.checkout,
        numPersons: hotelData.numPersons
      });
      fetchRooms(hotelData.hotelid);
    } else {
      setError('No hotel data found.');
    }
  }, []);

  const fetchRooms = async (hotelId) => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/hotel/${hotelId}/rooms`,{ headers: authHeader() });
      setRooms(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching rooms');
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRooms(prevRooms => {
      const isSelected = prevRooms.find(r => r.roomid === room.roomid);
      if (isSelected) {
        return prevRooms.filter(r => r.roomid !== room.roomid); // Remove if already selected
      } else {
        return [...prevRooms, room]; // Add new room
      }
    });
  };

  const calculateTotalPrice = () => {
    const checkInDate = new Date(bookingDetails.checkin);
    const checkOutDate = new Date(bookingDetails.checkout);
    const numDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    return selectedRooms.reduce((total, room) => total + (room.priceperday * numDays), 0);
  };

  const handleBookRooms = () => {
    const checkInDate = new Date(bookingDetails.checkin);
    const checkOutDate = new Date(bookingDetails.checkout);
    const numDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const roomsData = selectedRooms.map(room => ({
      roomId: room.roomid,
      roomType: room.roomtype,
      pricePerDay: room.priceperday,
      totalPrice: room.priceperday * numDays
    }));

    sessionStorage.setItem('bookingDetails', JSON.stringify({
      hotelId: hotel.hotelid,
      rooms: roomsData,
      checkin: bookingDetails.checkin,
      checkout: bookingDetails.checkout,
      numPersons: bookingDetails.numPersons,
      totalPrice: calculateTotalPrice()
    }));
    navigate('/payment');
  };

  if (!hotel) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20 bg-cover bg-center bg-no-repeat"   style={{ backgroundImage: `url(${hotelimg})` }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column: Owner Details */}
          <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-md bg-opacity-70">
            <h2 className="text-2xl font-bold mb-4">Hotel Details</h2>
            <p><strong>Owner:</strong> {hotel.ownername}</p>
            <p><strong>Location:</strong> {hotel.city}, {hotel.state}</p>
            <div className="my-4 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Your Stay Details</h3>
              <p><strong>Check-In Date:</strong> {bookingDetails.checkin}</p>
              <p><strong>Check-Out Date:</strong> {bookingDetails.checkout}</p>
              <p><strong>Number of Persons:</strong> {bookingDetails.numPersons}</p>
            </div>
          </div>

          {/* Center Column: Rooms */}
          <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-md bg-opacity-70">
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            {error && <p className="text-red-400 mb-4">{error}</p>}
            {rooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rooms.map((room) => (
                  <div key={room.roomid} className={`p-4 border rounded-lg shadow-sm ${selectedRooms.find(r => r.roomid === room.roomid) ? 'bg-gray-700' : 'bg-gray-800'}`}>
                    <h5 className="text-lg font-semibold mb-2">Room Type: {room.roomtype}</h5>
                    <p><strong>Price per Day:</strong> ₹{room.priceperday}</p>
                    <button
                      onClick={() => handleSelectRoom(room)}
                      className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                      {selectedRooms.find(r => r.roomid === room.roomid) ? 'Deselect Room' : 'Select Room'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No rooms available for this hotel.</p>
            )}
          </div>

          {/* Right Column: Cart */}
          <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-md bg-opacity-70">
            <h2 className="text-2xl font-bold mb-4">Booking Cart</h2>
            {selectedRooms.length > 0 ? (
              <div>
                <h5 className="text-lg font-semibold mb-2">Selected Rooms:</h5>
                {selectedRooms.map(room => (
                  <p key={room.roomid}>
                    <strong>Room Type:</strong> {room.roomtype} <strong>Price per Day:</strong> ₹{room.priceperday}
                  </p>
                ))}
                <p className="mt-4"><strong>Total Price:</strong> ₹{calculateTotalPrice()}</p>
                <button
                  onClick={handleBookRooms}
                  className="mt-4 w-full py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <p>No rooms selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
