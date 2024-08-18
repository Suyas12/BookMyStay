import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../service/auth-header';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchHotel, setSearchHotel] = useState('');
  const [searchBooking, setSearchBooking] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/users',{ headers: authHeader() });
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/hotels',{ headers: authHeader() });
      setHotels(response.data);
    } catch (error) {
      setError('Error fetching hotels');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/bookings',{ headers: authHeader() });
      setBookings(response.data);
    } catch (error) {
      setError('Error fetching bookings');
    }
  };

  const handleDisableUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:8080/admin/disable-user/${userId}`,{ headers: authHeader() });
      setSuccess('User disabled successfully');
      fetchUsers();
    } catch (error) {
      setError('Error disabling user');
    }
  };

  const handleEnableUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:8080/admin/enable-user/${userId}`,{ headers: authHeader() });
      setSuccess('User enabled successfully');
      fetchUsers();
    } catch (error) {
      setError('Error enabling user');
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete-hotel/${hotelId}`,{ headers: authHeader() });
      setSuccess('Hotel deleted successfully');
      fetchHotels();
    } catch (error) {
      setError('Error deleting hotel');
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    axios.put(`http://localhost:8080/owner/bookings`, { bookingId, status: newStatus },{ headers: authHeader() })
      .then(() => {
        setBookings(bookings.map(booking =>
          booking.bookingid === bookingId ? { ...booking, status: newStatus } : booking
        ));
        setSuccess('Booking status updated');
      })
      .catch(() => setError('Error updating booking status'));
  };

  const filterUsers = () => {
    return users.filter(user =>
      user.firstname.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    );
  };

  const filterHotels = () => {
    return hotels.filter(hotel =>
      hotel.hotelname.toLowerCase().includes(searchHotel.toLowerCase()) ||
      hotel.city.name.toLowerCase().includes(searchHotel.toLowerCase()) ||
      hotel.state.name.toLowerCase().includes(searchHotel.toLowerCase())
    );
  };

  const filterBookings = () => {
    return bookings.filter(booking => {
      const bookingId = booking.bookingid?.toString() || '';
      return bookingId.toLowerCase().includes(searchBooking.toLowerCase()) ||
        booking.hotel.hotelname.toLowerCase().includes(searchBooking.toLowerCase()) ||
        `${booking.user.firstname} ${booking.user.lastname}`.toLowerCase().includes(searchBooking.toLowerCase());
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20">
      <div className="container max-w-full mx-auto px-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Users"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              />
            </div>
            {filterUsers().length === 0 ? (
              <p>No users found.</p>
            ) : (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Enabled</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUsers().map(user => (
                    <tr key={user.userId}>
                      <td className="border p-2">{user.firstname} {user.lastname}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.role}</td>
                      <td className="border p-2">{user.enabled ? 'Yes' : 'No'}</td>
                      <td className="border p-2">
                        {user.enabled ? (
                          <button
                            onClick={() => handleDisableUser(user.userId)}
                            className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Disable User
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnableUser(user.userId)}
                            className="py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Enable User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Hotels</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Hotels"
                value={searchHotel}
                onChange={(e) => setSearchHotel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              />
            </div>
            {filterHotels().length === 0 ? (
              <p>No hotels found.</p>
            ) : (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Hotel Name</th>
                    <th className="border p-2">City</th>
                    <th className="border p-2">State</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterHotels().map(hotel => (
                    <tr key={hotel.hotelid}>
                      <td className="border p-2">{hotel.hotelname}</td>
                      <td className="border p-2">{hotel.city.name}</td>
                      <td className="border p-2">{hotel.state.name}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleDeleteHotel(hotel.hotelid)}
                          className="py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Delete Hotel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Bookings"
                value={searchBooking}
                onChange={(e) => setSearchBooking(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              />
            </div>
            {filterBookings().length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Booking ID</th>
                    <th className="border p-2">Hotel</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBookings().map(booking => (
                    <tr key={booking.bookingid}>
                      <td className="border p-2 overflow-wrap">{booking.bookingid}</td>
                      <td className="border p-2 overflow-wrap">{booking.hotel.hotelname}</td>
                      <td className="border p-2 overflow-wrap">{booking.user.firstname} {booking.user.lastname}</td>
                      <td className="border p-2 overflow-wrap">{booking.status}</td>
                      <td className="border p-2">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.bookingid, e.target.value)}
                          className="py-1 px-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-md"
                        >
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="CHECKED_IN">Checked In</option>
                          <option value="CHECKED_OUT">Checked Out</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
