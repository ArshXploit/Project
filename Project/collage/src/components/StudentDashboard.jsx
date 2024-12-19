import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grievance from './Portalcompo/Grievance';
import StudentsQueries from './Portalcompo/StudentsQueries';
import gp from "../assets/gp.jpg";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [notices, setNotices] = useState([]);
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
          axios.get('http://localhost:5000/api/student/dashboard', {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          }),
          axios.get('http://localhost:5000/api/student/classes', {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          })
        ]);

        setStudentData(dashboardRes.data);
        setEnrolledClasses(classesRes.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
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
    setStudentData(null);
    setEnrolledClasses([]);
    setNotices([]);
    
    // Force a clean reload
    window.location.href = '/user-profile';
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notices/student');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

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
    <nav className=" text-white drop-shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-bold">ClassBoard</h1>
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
            <h2 className="text-xl font-Roboto text-blue-600 mb-4">PROFILE</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {studentData?.firstName} {studentData?.lastName}</p>
              <p><span className="font-medium">Email:</span> {studentData?.email}</p>
              <p><span className="font-medium">Course:</span> {studentData?.course}</p>
            </div>
          </div>

          {/* Classes Card */}
          <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl text-blue-600 font-semibold mb-4">My Classes</h2>
            <div className="space-y-2">
              {enrolledClasses.length > 0 ? (
                enrolledClasses.map((cls) => (
                  <div key={cls._id} className="p-4 border rounded">
                    <h4 className="font-medium">{cls.name}</h4>
                    <p className="text-sm text-gray-600">
                      Teacher: {cls.teacher?.firstName} {cls.teacher?.lastName}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No classes enrolled yet.</p>
              )}
            </div>
          </div>

          {/* Notices Card */}
          <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
            <h2 className="text-2xl text-blue-600 font-semibold mb-4">Important Notices</h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="p-4 bg-orange-50 rounded border-l-4 border-orange-500">
                  <h3 className="font-semibold text-lg">{notice.title}</h3>
                  <p className="text-gray-600 mt-1">{notice.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <StudentsQueries 
            studentId={studentData?._id}
            studentName={`${studentData?.firstName} ${studentData?.lastName}`}
          />
          <Grievance role="student" />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;