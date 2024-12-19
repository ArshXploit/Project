import express from 'express';
import Application from '../models/Application.js';
import User from '../models/User.js';

const router = express.Router();

// Submit Application
router.post('/', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      dob, 
      course, 
      city, 
      state, 
      zip,
      role 
    } = req.body;

    console.log('Received application data:', req.body);

    // Validate required fields
    if (!firstName || !lastName || !email || !dob || !course || !role) {
      console.log('Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    try {
      // Check if application already exists
      const existingApplication = await Application.findOne({ email });
      if (existingApplication) {
        console.log('Application already exists for email:', email);
        return res.status(400).json({ 
          success: false,
          message: 'An application with this email already exists'
        });
      }

      // Create username
      const baseUsername = role === 'teacher' 
        ? `teacher_${firstName.toLowerCase()}_${lastName.toLowerCase()}` 
        : `student_${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
      
      let uniqueUsername = baseUsername;
      let counter = 1;
      
      while (await User.findOne({ username: uniqueUsername })) {
        uniqueUsername = `${baseUsername}_${counter}`;
        counter++;
      }

      // Create Application
      const application = new Application({
        firstName,
        lastName,
        email,
        dob: new Date(dob),
        course,
        city,
        state,
        zip,
        role,
        status: 'pending'
      });

      console.log('Saving application...');
      await application.save();
      console.log('Application saved successfully');

      // Create User
      const user = new User({
        username: uniqueUsername,
        email,
        firstName,
        lastName,
        role,
        profileSetup: false
      });

      console.log('Saving user...');
      await user.save();
      console.log('User saved successfully');

      res.status(201).json({ 
        success: true,
        message: 'Application submitted successfully! Please save your username for login.',
        username: uniqueUsername 
      });

    } catch (dbError) {
      console.error('Database operation error:', dbError);
      throw dbError;
    }

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error submitting application. Please try again.',
      error: error.message 
    });
  }
});

export default router;