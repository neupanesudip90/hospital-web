//controller for patient-related operations
import Patient from '../models/patientModel.js';
import bcrypt from 'bcryptjs';

// Register a new patient
export const registerPatient = async (req, res) => {
  const {
    name,
    email,
    password,
      phone,
      age,
    address,
    medicalHistory,
    emergencyContact,
      profilePicture,
      gender
    } = req.body; // Destructure the request body
    try {
      // Check if patient already exists
      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ message: "Patient already exists" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new patient
      const newPatient = new Patient({
        name,
        email,
        password: hashedPassword,
        phone,
        age,
        address,
        medicalHistory,
        emergencyContact,
        profilePicture,
          gender,
        role: 'patient', // Default role is 'patient'
      });
      // Save the patient to the database
      await newPatient.save();
      res.status(201).json({ message: "Patient registered successfully" });
    } catch (error) {
      console.error("Error registering patient:", error);
      res.status(500).json({ message: "Server error" });
    }
}

//get all patient list
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching all patients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get patient details by id
export const getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update patient details
export const updatePatientDetails = async (req, res) => {
    const { name, email, phone, age, address, medicalHistory, emergencyContact, profilePicture, gender } = req.body;
    
    try {   
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Update patient details
        patient.name = name || patient.name;
        patient.email = email || patient.email;
        patient.phone = phone || patient.phone;
        patient.age = age || patient.age;
        patient.address = address || patient.address;
        patient.medicalHistory = medicalHistory || patient.medicalHistory;
        patient.emergencyContact = emergencyContact || patient.emergencyContact;
        patient.profilePicture = profilePicture || patient.profilePicture;
        patient.gender = gender || patient.gender;
        await patient.save();
        res.status(200).json({ message: "Patient details updated successfully", patient });
    } catch (error) {
        console.error("Error updating patient details:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete patient account
export const deletePatientAccount = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient account deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient account:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// Get patient details with auth token for profile
export const authPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Server error" });
  }
};