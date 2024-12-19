import React, { useState } from "react";
import a1 from "../assets/a1.jpg";
import a2 from "../assets/a2.jpg";
import a3 from "../assets/a3.jpg";
import a20 from "../assets/a20.jpg";

const DynamicGallery = () => {
  const images = [a1, a2, a3, a20];
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div id="about-section" className="flex flex-col md:flex-row items-stretch justify-between px-8 py-8 bg-gray-100">
      {/* Gallery Section */}
      <div className="flex-1 md:w-1/2 h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="relative w-full h-full max-w-lg">
          <img
            src={images[currentImage]}
            alt={`Gallery ${currentImage + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
          >
            Prev
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className="flex-1 md:w-1/2 h-[400px] flex flex-col items-center justify-center md:ml-8 mt-8 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <div className="w-full h-full bg-orange-300 rounded-lg shadow-md p-6 overflow-y-auto scrollbar-hide">
          <p className="text-gray-700 text-lg leading-relaxed">
            The Potentiality of Asansol as an industrial metropolitan Centre had
            been realized from the very beginning of the 20th century. The need
            of the day was to give the region a boost in higher education to
            facilities its growth and development It was Prof. Satyakali
            Mukherjee who had submitted a proposal for the first time for
            opening a college in Asansol in 1944 to the existing Chairman of
            Asansol Municipality, Mr. Jogendranath Roy and the then SDO, Mr.
            Woodford, I.C.S. This is noble endeavor was supported by eminent
            stalwarts of Society as well as the general people of different
            strata who donated generously for the establishment of a higher
            academic institution.
          </p>
          <p className="text-gray-700 text-lg mt-4 leading-relaxed">
            A leading businessman and entrepreneur, Mr. G.S.Atwal initiated the
            move by constructing a field-building for the purpose in 1944 which
            was named Asansol College, affiliated to the University of Calcutta.
            I.A. Classes began with a students strength of only 132. However
            after this humble beginning, different corporate bodies and
            education stalwarts of Asansol, eminent representative of the
            society holding high positions, along with positive effort of the
            staff of Asansol Municipal Corporation and the Eastern Railway,
            collectively contributed towards to establishment of this college, A
            renowned businessman of the locality, who was also a freedom
            fighter, a social reformer as well as a visionary, Sri Banwarilal
            Bhalotia, magnanimously donated a plot of land of 20 Bighas towards
            a permanent building for the asansol College, Not of less importance
            is the impetus and support of Late Sri Shivdas Ghatak and Dr. B.C.
            Roy, the then Chief Minister of Bengal. With of unanimous
            encouragement and support all sections of the society, the
            newly-constructed college building (the present old building of the
            college) was inaugurated by the then Vice-Chancellor of Burdwan
            University, Sri S.K. Guha, and the college (B.B.College in short,
            enrolling itself under Burdwan University) in acknowledgment of the
            generous and unconditional support of the charismatic personality.
            Therefore the college has progressed in leaps and bounds. It was
            almost a divine opportunity to the people of the locality and no
            doubt, they have made the best use of it. The college has kept
            record of the outstanding results of its alumni for the past 66
            years who, through their positive contribution to the nation, have
            made the college proud. Knowledge is power, Endorsing the students
            with power is intrinsically the mission and vision of the college.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicGallery;
