import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  zip: String,
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { 
  timestamps: true,
  collection: 'applications'
});

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;