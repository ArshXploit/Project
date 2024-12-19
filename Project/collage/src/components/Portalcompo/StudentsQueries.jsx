import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentsQueries = ({ studentName }) => {
  const [queries, setQueries] = useState([]);
  const [question, setQuestion] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedTeacherName, setSelectedTeacherName] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      fetchQueriesForTeacher();
    }
  }, [selectedTeacher]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchQueriesForTeacher = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/queries?teacherId=${selectedTeacher}&studentName=${encodeURIComponent(studentName)}`);
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;
    setSelectedTeacher(teacherId);
    const teacher = teachers.find(t => t._id === teacherId);
    setSelectedTeacherName(teacher ? `${teacher.firstName} ${teacher.lastName}` : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeacher) {
      alert('Please select a teacher');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/queries', {
        studentName,
        question: question.trim(),
        teacherId: selectedTeacher,
        teacherName: selectedTeacherName
      });
      
      setQuestion('');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
      fetchQueriesForTeacher();
    } catch (error) {
      console.error('Error submitting query:', error);
      alert(error.response?.data?.message || 'Error submitting query');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Ask Your Question</h2>
      
      {showConfirmation && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Question submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <select
            value={selectedTeacher}
            onChange={handleTeacherChange}
            className="w-full p-2 border rounded mb-4"
            required
          >
            <option value="">Select a Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit Question
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="font-semibold">Your Questions & Answers</h3>
        {selectedTeacher ? (
          queries.length === 0 ? (
            <p className="text-gray-500">No questions yet for this teacher.</p>
          ) : (
            queries.map((query) => (
              <div key={query._id} className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600 mb-2">{query.question}</p>
                <p className="text-sm text-gray-500">To: {query.teacherName}</p>
                {query.answer && (
                  <div className="mt-2 p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-800">Teacher's Response:</p>
                    <p className="text-gray-600">{query.answer}</p>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(query.date).toLocaleString()}
                </p>
              </div>
            ))
          )
        ) : (
          <p className="text-gray-500">Please select a teacher to view your questions.</p>
        )}
      </div>
    </div>
  );
};

export default StudentsQueries;
