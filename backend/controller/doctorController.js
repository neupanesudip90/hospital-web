//admin controller
import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";


// Register a new doctor
export const registerDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    specialization,
    qualifications,
    licenceNumber,
    experience,
    gender,
    availability,
    profilePicture,
  } = req.body; // Destructure the request body

  try {
    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      qualifications,
      licenceNumber,
      experience,
      gender,
      availability,
        profilePicture,
      role: "doctor", // Default role is 'doctor'
    });
    // Save the doctor to the database
    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get doctor details by id
export const getDoctorDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get doctor details with auth token for profile
export const authDoctorDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update doctor details by id
export const updateDoctorDetails = async (req, res) => {
  const {
    name,
    email,
    phone,
    specialization,
    qualifications,
    licenceNumber,
    experience,
    gender,
    availability,
    profilePicture,
  } = req.body;

  try {
    const doctor = await Doctor.findById(req.doctor.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    // Update doctor details
    doctor.name = name;
    doctor.email = email;
    doctor.phone = phone;
    doctor.specialization = specialization;
    doctor.qualifications = qualifications;
    doctor.licenceNumber = licenceNumber;
    doctor.experience = experience;
    doctor.gender = gender;
    doctor.availability = availability;
    doctor.profilePicture = profilePicture;

    await doctor.save();
    res.status(200).json({ message: "Doctor details updated successfully" });
  } catch (error) {
    console.error("Error updating doctor details:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 


// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete doctor account by id
export const deleteDoctorAccount = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.doctor.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor account deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor account:", error);
    res.status(500).json({ message: "Server error" });
  }
}
