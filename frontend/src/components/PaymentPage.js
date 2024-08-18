import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../service/auth-header';
import payimg from '../images/payment.jpg';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const details = JSON.parse(sessionStorage.getItem('bookingDetails'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (details && user) {
      setBookingDetails(details);
      setUserDetails(user);
    } else {
      navigate('/'); // Redirect to home if no details are found
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    setLoading(true);

    try {
      // Make API call to book the room
      const response = await axios.post('http://localhost:8080/customer/booking', {
        userId: userDetails.userId,
        hotelId: bookingDetails.hotelId,
        roomIds: bookingDetails.rooms.map(room => room.roomId),
        checkInDate: bookingDetails.checkin,
        checkOutDate: bookingDetails.checkout,
        totalPay: bookingDetails.totalPrice,
        paymentMode: selectedPaymentMethod
      }, { headers: authHeader() });

      if (response.status === 200) {
        alert('Booking successful!');
        sessionStorage.removeItem('bookingDetails'); // Clear booking details
        // Don't remove user details here. We'll handle it in CustomerProfile after the update.
        navigate('/customerpage', { state: { shouldRefresh: true } }); // Redirect to customer profile page and refresh data
      } else {
        alert('Booking failed.');
      }
    } catch (error) {
      alert('An error occurred during the booking process.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDetails || !userDetails) {
    return <p className="text-gray-300">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${payimg})` }}>
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-md bg-opacity-70">
          <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
            <p><strong>Hotel ID:</strong> {bookingDetails.hotelId}</p>
            <p><strong>Check-In Date:</strong> {bookingDetails.checkin}</p>
            <p><strong>Check-Out Date:</strong> {bookingDetails.checkout}</p>
            <p><strong>Number of Persons:</strong> {bookingDetails.numPersons}</p>

            <h3 className="text-lg font-semibold mt-4">Selected Rooms</h3>
            {bookingDetails.rooms.map(room => (
              <p key={room.roomId}>
                <strong>Room Type:</strong> {room.roomType} <strong>Price Per Day:</strong> ₹{room.pricePerDay}
              </p>
            ))}

            <p className="mt-4"><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</p>

            <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100"
            >
              <option value="">Select Payment Method</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>

            <button
              onClick={handlePayment}
              className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
