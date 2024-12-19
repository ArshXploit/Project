import mongoose from 'mongoose';

const GrievanceSchema = new mongoose.Schema({
  complaint: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: 'Anonymous'
  },
  role: {
    type: String,
    default: 'Unknown'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Grievance', GrievanceSchema); 