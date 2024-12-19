import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true
  },
  password: {
    type: String,
    default: ''
  },
  profileSetup: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  collection: 'users' // Explicitly set collection name
});

const User = mongoose.model('User', UserSchema);
export default User;