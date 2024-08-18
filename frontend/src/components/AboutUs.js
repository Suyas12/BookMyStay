import React from "react";
import aboutimg from '../images/aboutus.jpg';

function AboutUs() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${aboutimg})` }}
    >
      <div className="container mx-auto px-4 py-20 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-5xl font-serif font-bold text-yellow-500 mb-12 text-center">
          About Us
        </h2>
        <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
          Welcome to BookMyStay, where hospitality meets convenience. We are
          dedicated to providing you with an exceptional experience, whether
          you're booking a room for business or leisure. Our platform offers the
          best deals on hotel accommodations, ensuring you find the perfect stay
          tailored to your needs. Trust us to make your travel planning seamless
          and enjoyable.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
