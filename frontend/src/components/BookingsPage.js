import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../service/auth-header';
import bookimg from '../images/book.jpg';

const BookingsPage = () => {
  const [hotelData, setHotelData] = useState({});
  const [bookings, setBookings] = useState([]);
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
      axios.get(`http://localhost:8080/owner/bookings/${hotelData.hotelid}`,{ headers: authHeader() })
        .then(response => setBookings(response.data))
        .catch(err => setError('Error fetching bookings: ' + err.message));
    }
  }, [hotelData.hotelid]);

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20 bg-cover bg-center bg-no-repeat"   style={{ backgroundImage: `url(${bookimg})` }}>
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

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Bookings for {hotelData.hotelname}</h2>
          <div className="mb-6">
            {/* <h3 className="text-xl font-medium">Hotel Owner: {hotelData.owner.firstname} {hotelData.owner.lastname}</h3> */}
          </div>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600">Booking ID</th>
                  <th className="py-2 px-4 border-b border-gray-600">Check-in Date</th>
                  <th className="py-2 px-4 border-b border-gray-600">Check-out Date</th>
                  <th className="py-2 px-4 border-b border-gray-600">Customer Name</th>
                  <th className="py-2 px-4 border-b border-gray-600">Room Type</th>
                  <th className="py-2 px-4 border-b border-gray-600">Status</th>
                  <th className="py-2 px-4 border-b border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.bookingid} className="border-t border-gray-600">
                    <td className="py-2 px-4 border-b border-gray-600">{booking.bookingid}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{booking.checkindate}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{booking.checkoutdate}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{booking.user.firstname}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{booking.room.roomtype}</td>
                    <td className="py-2 px-4 border-b border-gray-600">{booking.status}</td>
                    <td className="py-2 px-4 border-b border-gray-600">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.bookingid, e.target.value)}
                        className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-1"
                      >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CHECKED_IN">Checked In</option>
                        <option value="CHECKED_OUT">Checked Out</option>
                        <option value="CANCELLED">Cancelled</option>
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
  );
};

export default BookingsPage;
