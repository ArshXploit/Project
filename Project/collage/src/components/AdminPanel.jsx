import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.log('Response Error:', error);
  return Promise.reject(error);
});

const AdminPanel = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    students: [],
    description: ''
  });
  const [notice, setNotice] = useState({
    title: '',
    message: '',
    targetRole: 'all'
  });
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    type: 'undergraduate',
    description: '',
    duration: '',
    fees: '',
    criteria: '',
    image: 'cimage1.jpeg'
  });

  // Fetch data
  const fetchData = async () => {
    try {
      console.log('Fetching admin data...');
      const [notificationsRes, grievancesRes, usersRes, teachersRes, studentsRes, classesRes] = await Promise.all([
        axios.get("http://localhost:5000/notifications"),
        fetch("http://localhost:5000/grievances"),
        fetch("http://localhost:5000/api/admin/users/new"),
        axios.get("http://localhost:5000/api/admin/teachers"),
        axios.get("http://localhost:5000/api/admin/students"),
        axios.get("http://localhost:5000/api/admin/classes")
      ]);

      if (Array.isArray(notificationsRes.data)) {
        setNotifications(notificationsRes.data);
      }
      
      if (grievancesRes.ok && usersRes.ok) {
        setGrievances(await grievancesRes.json());
        setNewUsers(await usersRes.json());
        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
        setClasses(classesRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCourses();
  }, []);

  // Add this useEffect to log classes whenever they change
  useEffect(() => {
    console.log('Current classes:', classes);
  }, [classes]);

  // Add a new notification
  const handleAddNotification = async () => {
    if (!newNotification.trim()) {
      alert("Please enter a valid notification.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/notifications", {
        notification: newNotification
      });
      
      // Update notifications with the response data
      if (Array.isArray(response.data)) {
        setNotifications(response.data);
        setNewNotification("");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Failed to add notification.");
    }
  };

  // Delete a notification
  const handleDeleteNotification = async (index) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/notifications/${index}`);
        
        // Update notifications with the response data
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error deleting notification:", error);
        alert("Failed to delete notification.");
      }
    }
  };

  // Delete a grievance
  const handleDeleteGrievance = async (grievanceId) => {
    if (!grievanceId || typeof grievanceId !== 'string') {
      console.error('Invalid grievance ID:', grievanceId);
      alert('Invalid grievance ID');
      return;
    }

    if (window.confirm("Are you sure you want to delete this grievance?")) {
      try {
        console.log('Deleting grievance with ID:', grievanceId);
        const response = await axios.delete(`http://localhost:5000/grievances/${grievanceId}`);

        if (response.data.success) {
          setGrievances(response.data.grievances);
          alert("Grievance deleted successfully");
        } else {
          alert(response.data.message || "Failed to delete grievance");
        }
      } catch (error) {
        console.error("Error deleting grievance:", error);
        alert(error.response?.data?.message || "Failed to delete grievance");
      }
    }
  };

  // Create a new class
  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      if (!newClass.name || !newClass.teacher || !newClass.students.length) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/admin/classes", newClass);
      console.log('Class creation response:', response.data);
      
      setNewClass({
        name: '',
        teacher: '',
        students: [],
        description: ''
      });
      
      fetchData();
      alert("Class created successfully!");
    } catch (error) {
      console.error("Error creating class:", error);
      alert(error.response?.data?.message || "Failed to create class");
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting notice:', notice); // Debug log
      const response = await axios.post("http://localhost:5000/api/admin/notices", notice);
      console.log('Notice response:', response.data); // Debug log
      
      if (response.data.notice) {
        setNotice({ title: '', message: '', targetRole: 'all' });
        alert("Notice sent successfully!");
      }
    } catch (error) {
      console.error("Error sending notice:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to send notice");
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        title: newCourse.title || '',
        type: newCourse.type || 'undergraduate',
        duration: newCourse.duration || '',
        fees: newCourse.fees || '',
        description: newCourse.description || '',
        criteria: newCourse.criteria || '',
        image: 'cimage1.jpeg'
      };

      console.log('Submitting course:', courseData);
      const response = await axios.post('http://localhost:5000/api/admin/courses', courseData);
      console.log('Course response:', response.data);
      
      if (response.data._id) {
        setNewCourse({
          title: '',
          type: 'undergraduate',
          description: '',
          duration: '',
          fees: '',
          criteria: '',
          image: 'cimage1.jpeg'
        });
        fetchCourses();
        alert('Course added successfully!');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert(error.response?.data?.message || 'Failed to add course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/courses/${courseId}`);
        fetchCourses();
        alert('Course deleted successfully!');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        console.log('Deleting class:', classId);
        const response = await axios.delete(`http://localhost:5000/api/admin/classes/${classId}`);
        console.log('Delete response:', response.data);
        
        if (response.data.message === "Class deleted successfully") {
          // Update the classes state by removing the deleted class
          setClasses(prevClasses => prevClasses.filter(cls => cls._id !== classId));
          alert('Class deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Failed to delete class: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
            <h3 className="text-lg font-semibold text-orange-800">Total Students</h3>
            <p className="text-3xl font-bold text-orange-600">{students.length}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">Total Teachers</h3>
            <p className="text-3xl font-bold text-blue-600">{teachers.length}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-green-800">Active Classes</h3>
            <p className="text-3xl font-bold text-green-600">{classes.length}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Notification Section */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Notifications</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newNotification}
                  onChange={(e) => setNewNotification(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  placeholder="Enter new notification"
                />
                <button
                  onClick={handleAddNotification}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Add
                </button>
              </div>
              
              {/* Display Notifications */}
              <div className="mt-6">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 italic">No notifications available</p>
                ) : (
                  <ul className="space-y-4">
                    {notifications.map((notif, index) => (
                      <li 
                        key={index} 
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <span className="flex-1 text-gray-700">{notif}</span>
                        <button
                          onClick={() => handleDeleteNotification(index)}
                          className="ml-4 text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Notice Management Section */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send Notice</h2>
              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Notice Title"
                  value={notice.title}
                  onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                
                <textarea
                  placeholder="Notice Message"
                  value={notice.message}
                  onChange={(e) => setNotice({ ...notice, message: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                
                <select
                  value={notice.targetRole}
                  onChange={(e) => setNotice({ ...notice, targetRole: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Users</option>
                  <option value="teacher">Teachers Only</option>
                  <option value="student">Students Only</option>
                </select>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send Notice
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* New User Registrations Section */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">New User Registrations</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'student' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${user.profileSetup ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user.profileSetup ? 'Complete' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grievances Section */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grievances</h2>
              <div className="space-y-4">
                {grievances.map((grievance) => (
                  <div key={grievance._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {grievance.username}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            grievance.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {grievance.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{grievance.complaint}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(grievance.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteGrievance(grievance._id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Management Section - Full Width */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Courses</h2>
          <form onSubmit={handleCourseSubmit} className="space-y-4">
            {/* Course form fields with consistent styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />

              <select
                value={newCourse.type}
                onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Duration (e.g., 3 years)"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />

              <input
                type="text"
                placeholder="Fees"
                value={newCourse.fees}
                onChange={(e) => setNewCourse({ ...newCourse, fees: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add Course
            </button>
          </form>

          {/* Display Current Courses */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Current Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.type}</p>
                      <p className="text-sm text-gray-600">Fees: {course.fees}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Class Management Section */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Classes</h2>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Class Name"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />

              <select
                value={newClass.teacher}
                onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                multiple
                value={newClass.students}
                onChange={(e) => setNewClass({
                  ...newClass,
                  students: Array.from(e.target.selectedOptions, option => option.value)
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple students</p>
            </div>

            <textarea
              placeholder="Class Description (Optional)"
              value={newClass.description}
              onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Create Class
            </button>
          </form>

          {/* Display Current Classes */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Current Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div key={cls._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{cls.name}</h4>
                      <p className="text-sm text-gray-600">
                        Teacher: {cls.teacher?.firstName} {cls.teacher?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Students: {cls.students?.length || 0}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteClass(cls._id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;