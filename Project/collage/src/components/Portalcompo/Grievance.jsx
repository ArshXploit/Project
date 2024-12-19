import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Grievance = ({ role }) => {
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username from localStorage or wherever you store the user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUsername(userData.username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!complaint.trim()) {
      alert("Please enter your grievance");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/grievances", {
        complaint: complaint.trim(),
        username: username || 'Anonymous',
        role: role || 'Unknown'
      });

      if (response.data.success) {
        setComplaint("");
        setSubmitted(true);
        alert("Grievance submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || "Error submitting grievance. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Submit Your Grievance</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Enter your grievance here..."
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Submit Grievance
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-orange-600 font-medium">Your grievance has been submitted successfully. Thank you!</p>
        </div>
      )}

      <div className="p-6 bg-red-600 text-center mt-4 text-white rounded">
        <p>Note: All grievances will be directly addressed by the admin.</p>
      </div>
    </div>
  );
};

export default Grievance;
