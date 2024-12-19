import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminClick = () => {
    const password = prompt("Please enter the admin password:");
    if (password === "Admin Panel") {
      navigate("/AdminPanel");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleAboutClick = () => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/?scroll=about');
    } else {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative w-full bg-white shadow-md z-50">
      {/* Top bar for logo and desktop menu */}
      <div className="flex justify-between items-center py-6 px-8 md:px-32 bg-gradient-to-r from-white to bg-orange-100 drop-shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-52 hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-10 font-semibold text-gray-700">
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            <button onClick={handleAdminClick}>Admin</button>
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            <button onClick={handleAboutClick}>About</button>
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            <Link to="/Administration">Administration</Link>
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            Faculties
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            <Link to="/Alumni">Alumni</Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <button
          className="xl:hidden text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md xl:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleAdminClick}
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Admin
        </button>
        <button
          onClick={handleAboutClick}
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          About
        </button>
        <Link
          to="/Administration"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Administration
        </Link>
        <Link
          to="/faculties"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Faculties
        </Link>
        <Link
          to="/Alumni"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Alumni
        </Link>
      </div>
    </header>
  );
};

export default Header;
