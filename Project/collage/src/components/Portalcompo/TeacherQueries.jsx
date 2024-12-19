import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherQueries = () => {
  const [queries, setQueries] = useState([]);
  const [answers, setAnswers] = useState({});
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      // Get user data from token
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const teacherId = tokenData.userId;

      if (!teacherId) {
        setError('Teacher ID not found in token');
        return;
      }

      console.log('Fetching data for teacher:', teacherId);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };

      const [queriesRes, noticesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/queries?teacherId=${teacherId}`, { headers }),
        axios.get('http://localhost:5000/api/notices/teacher', { headers })
      ]);

      console.log('Queries response:', queriesRes.data);
      console.log('Notices response:', noticesRes.data);

      setQueries(queriesRes.data);
      setNotices(noticesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (queryId) => {
    try {
      const answer = answers[queryId];
      if (!answer || !answer.trim()) {
        alert('Please write an answer before submitting');
        return;
      }

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };

      const response = await axios.post(
        `http://localhost:5000/api/queries/${queryId}/answer`,
        { answer: answer.trim() },
        { headers }
      );

      if (response.data) {
        setAnswers(prev => ({ ...prev, [queryId]: '' }));
        fetchData();
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert(error.response?.data?.message || 'Error submitting answer. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-3xl shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-Roboto text-blue-600 mb-4">Important Notices</h2>
        <div className="space-y-4">
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices available.</p>
          ) : (
            notices.map((notice) => (
              <div key={notice._id} className="p-4 bg-orange-50 rounded border-l-4 border-orange-500">
                <h3 className="font-semibold text-lg">{notice.title}</h3>
                <p className="text-gray-600 mt-1">{notice.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <h2 className="text-2xl font-Roboto text-blue-600 mb-4">Student Questions</h2>
      <div className="space-y-4">
        {queries.length === 0 ? (
          <p className="text-gray-500">No questions from students yet.</p>
        ) : (
          queries.map((query) => (
            <div key={query._id} className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">From: {query.studentName}</p>
              <p className="text-gray-600 mb-2">{query.question}</p>
              {!query.isAnswered ? (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Write your answer..."
                    value={answers[query._id] || ''}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      [query._id]: e.target.value
                    }))}
                  />
                  <button
                    onClick={() => handleAnswer(query._id)}
                    className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-green-50 rounded">
                  <p className="font-medium text-green-800">Your Answer:</p>
                  <p className="text-gray-600">{query.answer}</p>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Posted: {new Date(query.date).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherQueries; 