import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grievance from './Portalcompo/Grievance';
import TeacherQueries from './Portalcompo/TeacherQueries';
import gp from "../assets/gp.jpg"

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpires = localStorage.getItem('tokenExpires');
    const currentTime = new Date().getTime();

    if (!token || !tokenExpires || currentTime > parseInt(tokenExpires)) {
      handleLogout();
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashboardRes, classesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/teacher/dashboard', {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          }),
          axios.get('http://localhost:5000/api/teacher/classes', {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          })
        ]);

        setTeacherData(dashboardRes.data);
        setAssignedClasses(classesRes.data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        if (error.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear any cached data
    setTeacherData(null);
    setAssignedClasses([]);
    
    // Force a clean reload
    window.location.href = '/user-profile';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg center"
    style={{
      backgroundImage:`url(${gp})`
    }}
      >
      <nav className="text-white drop-shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-bold">OfficeBoard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="bg-orange-200 font-semibold text-red-600 px-4 py-2 rounded-full hover:bg-red-900"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-Roboto text-blue-600 mb-4">Profile</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {teacherData?.firstName} {teacherData?.lastName}</p>
              <p><span className="font-medium">Email:</span> {teacherData?.email}</p>
              <p><span className="font-medium">Department:</span> {teacherData?.department}</p>
            </div>
          </div>

          {/* Classes Card */}
          <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl font-Roboto text-blue-600 mb-4">Classes Assigned</h2>
            <div className="space-y-2">
              {assignedClasses.length > 0 ? (
                assignedClasses.map((cls) => (
                  <div key={cls._id} className="p-4 border rounded">
                    <h4 className="font-medium">{cls.name}</h4>
                    <p className="text-sm text-gray-600">Students:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {cls.students?.map((student) => (
                        <li key={student._id}>
                          {student.firstName} {student.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No classes assigned yet.</p>
              )}
            </div>
          </div>

          <TeacherQueries />
          <Grievance role="teacher" />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;