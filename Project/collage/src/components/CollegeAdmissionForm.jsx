import React, { useState } from "react";

const CollegeAdmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    course: "",
    city: "",
    state: "",
    zip: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error when the user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.course) newErrors.course = "Please select a course.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    if (!formData.role) newErrors.role = "Please select your role.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmissionResult({
            success: true,
            message: data.message,
            username: data.username
          });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            course: "",
            city: "",
            state: "",
            zip: "",
            role: ""
          });
        } else {
          setSubmissionResult({
            success: false,
            message: data.message || "Submission failed"
          });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmissionResult({
          success: false,
          message: "Error submitting form. Please try again."
        });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">College Admission Form</h2>
      
      {/* Show submission result if exists */}
      {submissionResult && (
        <div className={`mb-4 p-4 rounded ${submissionResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <p>{submissionResult.message}</p>
          {submissionResult.username && (
            <p className="mt-2 font-semibold">
              Your username for login: {submissionResult.username}
              <br />
              <span className="text-sm">Please save this username for future login.</span>
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Role Selection - New Field */}
        <div className="mb-4">
          <label htmlFor="role" className="block font-semibold mb-2">Applying as</label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block font-semibold mb-2">First Name</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold mb-2">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block font-semibold mb-2">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="course" className="block font-semibold mb-2">Course</label>
          <select
            id="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Engineering">Engineering</option>
          </select>
          {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-2">City</label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block font-semibold mb-2">State</label>
          <input
            id="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="zip" className="block font-semibold mb-2">ZIP</label>
          <input
            id="zip"
            type="text"
            value={formData.zip}
            onChange={handleChange}
            placeholder="90210"
            className={`w-full p-3 border rounded-md focus:outline-none ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollegeAdmissionForm;