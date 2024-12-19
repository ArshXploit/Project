import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

// Import default images
import cimage1 from "../assets/cimage1.jpeg";
import cimage2 from "../assets/cimage2.jpeg";
import cimage3 from "../assets/cimage3.jpeg";

const defaultImages = {
  'cimage1.jpeg': cimage1,
  'cimage2.jpeg': cimage2,
  'cimage3.jpeg': cimage3
};

const Undergrade = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses/undergraduate');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center mb-8 font-semibold"
      >
        Undergraduate Courses
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course._id} className="w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={defaultImages[course.image] || defaultImages['cimage1.jpeg']}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {course.title}
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-sm">
                {course.duration}
              </Typography>

              <Typography variant="body2" color="blue-gray" className="mt-2 font-semibold">
                Fees:
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mb-2">
                {course.fees}
              </Typography>

              <Typography variant="body2" color="blue-gray" className="mt-2 font-semibold">
                Criteria:
              </Typography>
              <Typography variant="body2" color="blue-gray" className="mb-2">
                {course.criteria}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Undergrade;