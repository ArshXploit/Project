import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['undergraduate', 'graduate'],
    default: 'undergraduate'
  },
  description: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  fees: {
    type: String,
    default: ''
  },
  criteria: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'cimage1.jpeg'
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', CourseSchema); 