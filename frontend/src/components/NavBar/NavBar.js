import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store the user role
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
      const user = JSON.parse(userData);
      setUserRole(user.role); // Set user role from session storage
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage items
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAccountClick = () => {
    if (userRole === 'CUSTOMER') {
      navigate('/customerpage');
    } else if (userRole === 'OWNER') {
      navigate('/ownerpage');
    } else if (userRole === 'ADMIN') {
      navigate('/adminpage');
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg fixed w-full top-0 z-50 transition-transform duration-300 h-16">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="navbar-logo text-3xl font-serif font-bold">
          <Link
            to="/"
            className="hover:text-yellow-500 transition-colors duration-300"
          >
            BookMyStay
          </Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul
          ref={menuRef}
          className={`lg:flex lg:space-x-8 lg:static lg:bg-transparent lg:p-0 fixed top-0 right-0 w-full lg:w-auto bg-gray-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0`}
        >
          {[
            "about-us",
            "contact",
            ...(isLoggedIn ? [{ label: "Account", onClick: handleAccountClick }] : []),
            ...(isLoggedIn ? [] : ["login", "signup"]),
            ...(isLoggedIn ? [{ label: "Logout", onClick: handleLogout }] : [])
          ].map((item, index) => {
            if (typeof item === 'string') {
              return (
                <li key={index} className="p-4 lg:p-0">
                  <Link
                    to={`/${item}`}
                    className="block lg:inline text-lg hover:text-yellow-500 transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                  </Link>
                </li>
              );
            }
            return (
              <li key={index} className="p-4 lg:p-0">
                <button
                  onClick={item.onClick}
                  className="block lg:inline text-lg hover:text-yellow-500 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
