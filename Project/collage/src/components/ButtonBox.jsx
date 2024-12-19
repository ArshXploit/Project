import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonBox = () => {
  const navigate = useNavigate();
  return (
    <div className="relative group flex w-full gap-6 px-4 py-4 bg-gray-100 justify-center">
      {/* Button 1 */}
      <div className="relative group">
        <button
          className="bg-orange-400 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:bg-orange-500 transition duration-300"
          onClick={() => {
            navigate("/user-profile");
          }}
        >
          <i className="fas fa-user text-lg"></i>
        </button>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Login
        </span>
      </div>

      {/* Button 2 */}
      <div className="relative group">
        <button 
          className="bg-orange-400 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:bg-orange-500 transition duration-300"
          onClick={() => {
            navigate("/Undergrade");
          }}
        >
          <i className="fas fa-book-open text-lg"></i>
        </button>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Undergrad
        </span>
      </div>

      {/* Button 3 */}
      <div className="relative group">
        <button 
          className="bg-orange-400 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:bg-orange-500 transition duration-300"
          onClick={() => {
            navigate("/graduation");
          }}
        >
          <i className="fas fa-graduation-cap text-lg"></i>
        </button>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Graduation
        </span>
      </div>

      {/* Button 4 */}
      <div className="relative group">
        <button 
          className="bg-orange-400 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:bg-orange-500 transition duration-300"
          onClick={() => {
            navigate("/contact");
          }}
        >
          <i className="fas fa-phone text-lg"></i>
        </button>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Contact
        </span>
      </div>

      {/* Button 5 */}
      <div className="relative group">
        <button 
          className="bg-orange-400 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:bg-orange-500 transition duration-300"
          onClick={() => {
            navigate("/chat");
          }}
        >
          <i className="fas fa-comments text-lg"></i>
        </button>
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Chat
        </span>
      </div>
    </div>
  );
};

export default ButtonBox;
