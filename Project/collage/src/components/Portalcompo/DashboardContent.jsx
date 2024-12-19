import React from 'react';

const DashboardContent = ({ userData }) => {
  if (!userData) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.firstName}!</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="space-y-3">
          <p><span className="font-medium">Name:</span> {userData.firstName} {userData.lastName}</p>
          <p><span className="font-medium">Email:</span> {userData.email}</p>
          <p><span className="font-medium">Role:</span> {userData.role}</p>
          <p><span className="font-medium">Username:</span> {userData.username}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userData.role === 'teacher' ? (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium">Classes Assigned</h3>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium">Students</h3>
                <p className="text-2xl font-bold text-green-600">150</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium">Enrolled Courses</h3>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium">Attendance</h3>
                <p className="text-2xl font-bold text-green-600">85%</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;