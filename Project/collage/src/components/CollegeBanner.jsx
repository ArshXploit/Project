import React from "react";
import { useNavigate } from "react-router-dom"; 
import bg from "../assets/bg.jpg";

const CollegeBanner = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate("/admission-form"); 
  };

  return (
    <div className="relative h-screen bg-blue-100">
      <img
        src={bg}
        alt="College Building"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-CastoroTitling animate__animated animate__fadeIn animate__delay-1s animate__slideInUp">
          WELCOME TO BB COLLEGE
        </h1>
        <p className="mt-2 text-lg md:text-2xl text-orange-500 font-JacquesFrancois animate__animated animate__fadeIn animate__delay-2s">
          - Empowering Minds -
        </p>
        <button
          onClick={handleApplyNow}
          className="mt-8 px-6 py-3 font-CastoroTitling bg-orange-500 hover:bg-orange-600 text-white rounded-md text-lg animate__animated animate__fadeIn animate__delay-3s animate__zoomIn"
        >
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default CollegeBanner;

