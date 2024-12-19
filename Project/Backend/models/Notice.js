import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  targetRole: {
    type: String,
    enum: ['all', 'teacher', 'student'],
    default: 'all'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Notice', NoticeSchema); 