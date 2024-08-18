import React from "react";
import { useSpring, animated } from "@react-spring/web";
import homeimg from '../images/home.jpg';

function HomePage() {
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 bg-cover bg-center"
      style={{ backgroundImage: `url(${homeimg})` }}
    >
      <animated.section
        id="home"
        style={fadeInProps}
        className="flex flex-col items-center justify-center text-center px-4 bg-gray-800 bg-opacity-70 rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-5xl font-bold text-yellow-500 mb-6">
          Welcome to BookMyStay
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
          Experience luxury and comfort in the best hotels worldwide. Whether
          you are looking for a business trip or a leisure escape, we ensure a
          seamless booking experience with the finest accommodations.
        </p>
      </animated.section>
    </div>
  );
}
export default HomePage;
