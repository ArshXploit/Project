import React from "react";
import ignou from "../assets/ignou.png"
import knu from "../assets/knu.png"
import netaji from "../assets/netaji.png"
import tcs from "../assets/tcs.png"
import bangla from "../assets/bangla.jpg"
import ugc from "../assets/ugc.png"




const ImportantLinks = () => {
  const logos = [
    {
      src: netaji, 
      alt: "Netaji Subhas Open University",
      link: "https://www.wbnsou.ac.in/index_web.shtml", 
    },
    {
      src: ignou, 
      alt: "IGNOU",
      link: "https://www.ignou.ac.in/", 
    },
    {
      src: knu, 
      alt: "Ministry of Education",
      link: "https://www.knu.ac.in/", 
    },
    {
      src: tcs, 
      alt: "TCS",
      link: "https://www.tcsion.com/SelfServices/", 
    },
    {
      src: ugc, 
      alt: "UGC",
      link: "https://www.ugc.gov.in/",
    },
    {
      src: bangla, 
      alt: "Banglar Uchchashiksha",
      link: "https://banglaruchchashiksha.wb.gov.in/",
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Important Links Title */}
        <div className="lg:w-1/2 text-left mb-8 lg:mb-0">
          <h1 className="text-7xl text-left font-CastoroTitling">
            IMPORTANT <span className="text-blue-600">LINKS</span>
          </h1>
        </div>

        {/* Right Section: Logos Grid */}
        <div className="lg:w-2/3 grid grid-cols-3 gap-8 justify-items-center">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transform transition duration-200"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-24 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantLinks;
