import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add this to ensure proper population
ClassSchema.pre('find', function() {
  this.populate('teacher', 'firstName lastName')
      .populate('students', 'firstName lastName');
});

export default mongoose.model('Class', ClassSchema); 