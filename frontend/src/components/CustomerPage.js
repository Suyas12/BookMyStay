import React from 'react';
import CustomerProfile from './CustomerProfile';
import CheckInForm from './CheckInForm';
import Card from './Card';
import avatarImg from '../images/avatar.jpeg';
import checkImg from '../images/checkin.jpg';
import loginimg from '../images/login.jpg';


const CustomerPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${loginimg})` }}
    >
      <div className="container mx-auto px-4 bg-opacity-70">
        <div className="grid gap-10 md:grid-cols-2">
          <Card
            title="Customer Profile"
            description={<CustomerProfile />}
            imgSrc={avatarImg}
            imgAlt="Customer Profile"
            customClasses="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg"
          />
          <Card
            title="Check-In Desk"
            description={<CheckInForm />}
            imgSrc={checkImg}
            imgAlt="Check-In Desk"
            customClasses="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
