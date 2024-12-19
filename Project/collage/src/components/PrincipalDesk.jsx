import React from "react";
import p1 from "../assets/p1.jpg"

const PrincipalDesk = () => {
  return (
    <div className="py-8 bg-white">
      <h2 className="text-center text-2xl font-bold mb-4">From the Principal's Desk</h2>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
        <img
          src={p1} // Replace with Principal's image
          alt="Principal"
          className="w-48 h-48 rounded-full shadow-md object-cover"
        />
        <div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to BB College! Our institution is dedicated to empowering young minds
            with quality education and holistic development. At BB College, we focus not
            only on academic excellence but also on nurturing values and skills that prepare
            our students for the challenges of the future.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Join us in this journey of learning and growth. Together, we aim to create a
            brighter tomorrow.
          </p>
          <p className="mt-4 font-semibold text-gray-900">- Dr. Amitava Basu, Principal</p>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDesk;
