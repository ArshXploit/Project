import React from 'react';
import { motion } from 'framer-motion';

const administrationData = [
  { id: 1, name: "Sri Moloy Ghatak", role: "President, Governing Body, B. B. College, Asansol" },
  { id: 2, name: "Dr. Amitava Basu", role: "Ex- Officio Secretary, G.B. & Principal, B. B. College, Asansol" },
  { id: 3, name: "Mr. Nurul Islam", role: "Government Nominee" },
  { id: 4, name: "Mrs Jayanti Mullick", role: "Government Nominee" },
  { id: 5, name: "Dr. L. N. Neogi", role: "Government Nominee" },
  { id: 6, name: "Dr. Parimal Ghosh", role: "Teaching Representative" },
  { id: 7, name: "Dr. Koushik Mukherjee", role: "Teacher Representative" },
  { id: 8, name: "Dr. Jyotirmoy Ghosh", role: "Teacher Representative" },
  { id: 9, name: "Dr. Arvind Mishra", role: "University Nominee" },
  { id: 10, name: "Dr. Paramita Roychowdhury", role: "University Nominee" },
  { id: 11, name: "Mr. Sudip Chatterjee", role: "N T Representative" },
  { id: 12, name: "Mr. R. N. Bhalotia", role: "Donor Member" },
];

const Administration = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Administration</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {administrationData.map((member, index) => (
          <motion.div
            key={member.id}
            className="p-4 bg-white shadow-md rounded-lg border-l-4 border-orange-400 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-orange-700">{member.name}</h2>
            <p className="text-sm text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Administration;