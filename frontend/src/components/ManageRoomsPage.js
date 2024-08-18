import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../service/auth-header';
import roomimg from '../images/rooms.jpg';

const ROOM_TYPES = ['AC', 'REGULAR', 'DELUXE'];

const ManageRoomsPage = () => {
  const [hotelData, setHotelData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomtype: 'AC', priceperday: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedHotelData = JSON.parse(sessionStorage.getItem('hotel'));
    if (storedHotelData) {
      setHotelData(storedHotelData);
    }
  }, []);

  useEffect(() => {
    if (hotelData.hotelid) {
      axios.get(`http://localhost:8080/rooms/hotel/${hotelData.hotelid}`,{ headers: authHeader() })
        .then(response => setRooms(response.data))
        .catch(err => setError('Error fetching rooms: ' + err.message));
    }
  }, [hotelData.hotelid]);

  const handleAddRoom = () => {
    axios.post('http://localhost:8080/rooms', {
      hotel: { "hotelid": hotelData.hotelid },
      roomtype: newRoom.roomtype,
      priceperday: newRoom.priceperday
    },{ headers: authHeader() })
      .then(response => {
        setRooms([...rooms, response.data]);
        setNewRoom({ roomtype: 'AC', priceperday: '' });
        setSuccess('Room added successfully');
      })
      .catch(err => setError('Error adding room: ' + err.message));
  };

  const handleRemoveRoom = (roomId) => {
    axios.delete(`http://localhost:8080/rooms/${roomId}`,{ headers: authHeader() })
      .then(() => {
        setRooms(rooms.filter(room => room.roomid !== roomId));
        setSuccess('Room removed successfully');
      })
      .catch(err => setError('Error removing room: ' + err.message));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20 bg-cover bg-center bg-no-repeat"   style={{ backgroundImage: `url(${roomimg})` }}>
      <div className="container max-w-5xl mx-auto px-4">
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

        <h2 className="text-3xl font-bold mb-4">Manage Rooms for Hotel</h2>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 bg-opacity-70">
          <h3 className="text-2xl font-semibold mb-4">Add New Room</h3>
          <div className="mb-4">
            <label htmlFor="roomtype" className="block text-lg text-gray-300 mb-1">Room Type:</label>
            <select
              id="roomtype"
              name="roomtype"
              value={newRoom.roomtype}
              onChange={(e) => setNewRoom({ ...newRoom, roomtype: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              required
            >
              {ROOM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="priceperday" className="block text-lg text-gray-300 mb-1">Price Per Day:</label>
            <input
              type="number"
              id="priceperday"
              name="priceperday"
              value={newRoom.priceperday}
              onChange={(e) => setNewRoom({ ...newRoom, priceperday: e.target.value })}
              className="block w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              required
            />
          </div>
          <button
            onClick={handleAddRoom}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Room
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg bg-opacity-70">
          <h3 className="text-2xl font-semibold mb-4">Rooms List</h3>
          {rooms.length === 0 ? (
            <p>No rooms found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map(room => (
                <div key={room.roomid} className="bg-gray-700 shadow-lg rounded-lg p-4 text-gray-200">
                  <h4 className="text-lg font-semibold mb-2">{room.roomtype}</h4>
                  <p className="mb-1"><strong>Price Per Day:</strong> {room.priceperday}</p>
                  <button
                    onClick={() => handleRemoveRoom(room.roomid)}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Remove Room
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRoomsPage;
