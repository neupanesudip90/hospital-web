//doctor schema model
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    licenceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  availability: [{
  day: String,       // e.g. "Monday"
  from: String,      // e.g. "09:00"
  to: String         // e.g. "17:00"
  }],
  profilePicture: {
    type: String,     // URL or path to the profile picture
    default: 'default-profile.png' // Default picture if none provided
  },
  role: {
    type: String,
    default: 'doctor', // Default role for doctor
    required: true
  }
}, {
  timestamps: true,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;