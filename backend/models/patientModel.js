//patient schema models
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
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
  address: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  profilePicture: {
    type: String,     // URL or path to the profile picture
    default: 'default-profile.png' // Default picture if none provided
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  role: {
    type: String,
    default: 'patient', // Default role for patient
  }
}, {
  timestamps: true,
});
const Patient = mongoose.model('Patient', patientSchema);
export default Patient;