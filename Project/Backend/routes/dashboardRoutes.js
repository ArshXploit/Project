import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Teacher Dashboard Route
router.get('/teacher/dashboard', protect, async (req, res) => {
  try {
    const teacher = await User.findById(req.user._id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get teacher-specific data
    const dashboardData = {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      department: teacher.department,
      classes: [
        { name: 'Class A', schedule: 'Monday 10:00 AM' },
        { name: 'Class B', schedule: 'Wednesday 2:00 PM' }
      ],
      notifications: [
        { message: 'Faculty meeting tomorrow', date: new Date() },
        { message: 'Grade submission deadline approaching', date: new Date() }
      ]
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Student Dashboard Route
router.get('/student/dashboard', protect, async (req, res) => {
  try {
    const student = await User.findById(req.user._id);
    if (!student || student.role !== 'student') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get student-specific data
    const dashboardData = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      course: student.course,
      courses: [
        { name: 'Mathematics', instructor: 'Dr. Smith' },
        { name: 'Physics', instructor: 'Dr. Johnson' }
      ],
      notifications: [
        { message: 'Upcoming test next week', date: new Date() },
        { message: 'Assignment deadline extended', date: new Date() }
      ]
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 