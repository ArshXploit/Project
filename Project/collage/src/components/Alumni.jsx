import React from "react";

const Alumni = () => {
  const alumniMembers = [
    {
      name: "Arsh Ali Khan",
      role: "Software/CyberSecurity Engineer",
      imgSrc: "https://via.placeholder.com/150",
      batch: "Batch: 2022",
    },
    {
      name: "Qasim Sayed",
      role: "C++ Developer",
      imgSrc: "https://via.placeholder.com/150",
      batch: "Batch: 2022",
    },
    {
      name: "Anuj Mukherjee",
      role: "AI Developer",
      imgSrc:
        "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar5.jpg",
      batch: "Batch: 2022",
    },
    {
      name: "Zaid",
      role: "Development Engineer",
      imgSrc:
        "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar24.jpg",
      batch: "Batch: 2021",
    },
    {
      name: "Ankon",
      role: "Creative Director",
      imgSrc:
        "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar23.jpg",
      batch: "Batch: 2022",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center mb-5 px-4">
      <div className="w-full max-w-7xl px-3 mb-6 mx-auto">
        <div className="relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
              Our Alumni Team
            </h1>
            <p className="text-lg font-medium text-gray-500 animate-fade-in">
              Meet our alumni, a group of remarkable individuals whose
              contributions continue to inspire us.
            </p>
          </div>

          {/* Alumni List */}
          <div className="flex flex-wrap justify-center gap-6">
            {alumniMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 group"
              >
                {/* Profile Image */}
                <div className="relative w-[150px] h-[150px] mb-4">
                  <img
                    className="rounded-full shadow-md w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={member.imgSrc}
                    alt={`${member.name} Avatar`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                </div>

                {/* Name and Role */}
                <div className="text-center">
                  <a
                    href="#"
                    className="text-gray-800 font-semibold text-xl hover:text-sky-500 transition-colors duration-300"
                  >
                    {member.name}
                  </a>
                  <span className="block font-medium text-gray-500">
                    {member.role}
                  </span>
                </div>

                {/* Batch Information */}
                <p className="text-sm text-gray-400 mt-2 group-hover:text-sky-500 transition-colors duration-300">
                  {member.batch}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;