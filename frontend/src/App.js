import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';
import SignUpPage from './components/SignUpPage';
import BookingsPage from './components/BookingsPage'; // Make sure this is the correct path
import CustomerPage from './components/CustomerPage';
import HotelDetails from './components/HotelDetails';
import PaymentPage from './components/PaymentPage';
import HotelOwnerPage from './components/HotelOwnerPage';
import ManageRoomsPage from './components/ManageRoomsPage';
import AdminPage from './components/AdminPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import UpdatePasswordPage from './components/UpdatePasswordPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customerpage" element={<CustomerPage />} />
          <Route path="/hotel" element={<HotelDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ownerpage" element={<HotelOwnerPage />} />
          <Route path="/bookings" element={<BookingsPage />} /> {/* Add route for BookingsPage */}
          <Route path="/manage-rooms" element={<ManageRoomsPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          {/* Redirect any unmatched routes to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
