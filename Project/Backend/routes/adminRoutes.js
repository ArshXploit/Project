import express from 'express';
import Application from '../models/Application.js';
import User from '../models/User.js';

const router = express.Router();

// Get all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update application status
router.put('/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get new users (registered in the last 30 days)
router.get('/users/new', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await User.find({
      createdAt: { $gte: thirtyDaysAgo }
    })
    .sort({ createdAt: -1 }) // Most recent first
    .select('-password'); // Exclude password field

    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

export default router;