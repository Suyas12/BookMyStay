import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from '../service/auth-header';
import { useLocation } from 'react-router-dom';

const isFutureBooking = (bookingDate) => {
  const now = new Date();
  return new Date(bookingDate) > now;
};

const CustomerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
      
      // Fetch bookings data on mount and when redirected from PaymentPage
      fetchBookings(storedUserData.userId);
    }
  }, [location.state?.shouldRefresh]);

  const fetchBookings = (userId) => {
    axios.get(`http://localhost:8080/customer/booking/${userId}`, { headers: authHeader() })
      .then(response => {
        setBookings(response.data);
        console.log(response.data); // For debugging
      })
      .catch(error => {
        console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios.put(`http://localhost:8080/customer/booking/cancel/${bookingId}`, { headers: authHeader() })
      .then(() => {
        setBookings(bookings.map(booking =>
          booking.bookingid === bookingId ? { ...booking, status: 'CANCELLED' } : booking
        ));
      })
      .catch(error => {
        console.error("Error canceling booking:", error.response ? error.response.data : error.message);
      });
  };

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 text-gray-100 py-16 px-4 bg-opacity-70">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg p-6 mb-8 bg-opacity-70">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Profile</h2>
        <div className="grid grid-cols-1 gap-4 text-lg">
          <p><strong>First Name:</strong> {userData.firstname}</p>
          <p><strong>Last Name:</strong> {userData.lastname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>
      </div>

      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6 bg-opacity-70">
        <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-center text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map(booking => (
              <div
                key={booking.bookingid}
                className="bg-gray-700 text-gray-100 rounded-lg shadow-lg p-4 flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">{booking.hotel.hotelname}</h3>
                <p><strong>Booking ID:</strong> {booking.bookingid}</p>
                <p><strong>Room Type:</strong> {booking.room.roomType}</p>
                <p><strong>Check-In Date:</strong> {booking.checkin}</p>
                <p><strong>Check-Out Date:</strong> {booking.checkout}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Total Paid:</strong> ₹{booking.totalPay}</p>
                {isFutureBooking(booking.checkin) && booking.status !== 'CANCELLED' && (
                  <button
                    className="mt-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
                    onClick={() => handleCancelBooking(booking.bookingid)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
