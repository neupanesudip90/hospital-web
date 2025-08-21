import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, gender, bio, qualifications, dob } =
      req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get profile image URL (from multer)
    const profilePicture = req.file ? req.file.path.replace(/\\/g, "/") : "";

    // Create new admin
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin", // Ensure admin role is enforced
      profilePicture,
      gender,
      bio,
      qualifications,
      dob,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register a new patient
export const registerPatient = async (req, res) => {
  const { name, email, password, phone } = req.body; // Destructure the request body
  try {
    // Check if patient already exists
    const existingPatient = await User.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new patient
    const newPatient = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Store hashed password
      phone,
      role: "patient", // Default role is 'patient'
    });
    // Save the patient to the database
    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Register a new doctor
export const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      qualifications,
      licenseNumber,
      experienceYears,
      gender,
      department,
      bio,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // File uploaded by multer-cloudinary middleware
    // req.file.path is the cloudinary URL
    const profilePicture = req.file?.path || null;

    // Create doctor user
    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      qualifications,
      licenseNumber,
      experienceYears,
      gender,
      department,
      bio,
      profilePicture,
      role: "doctor",
    });

    await newDoctor.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newDoctor._id, role: newDoctor.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        phone: newDoctor.phone,
        specialization: newDoctor.specialization,
        qualifications: newDoctor.qualifications,
        licenseNumber: newDoctor.licenseNumber,
        experienceYears: newDoctor.experienceYears,
        gender: newDoctor.gender,
        department: newDoctor.department,
        bio: newDoctor.bio,
        profilePicture: newDoctor.profilePicture,
        role: newDoctor.role,
      },
    });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user details by ID
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user profile
export const authUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update logged-in admin details
export const updateAdminDetails = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      req.admin.id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin || updatedAdmin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update doctor details
export const updateDoctorDetails = async (req, res) => {
  const {
    name,
    email,
    phone,
    specialization,
    qualifications,
    licenseNumber,
    experienceYears,
    gender,
  } = req.body;

  const profilePicture = req.file?.path || null;

  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update fields
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.specialization = specialization || doctor.specialization;
    doctor.qualifications = qualifications || doctor.qualifications;
    doctor.licenseNumber = licenseNumber || doctor.licenseNumber;
    doctor.experienceYears = experienceYears || doctor.experienceYears;
    doctor.gender = gender || doctor.gender;
    doctor.profilePicture = profilePicture || doctor.profilePicture;

    await doctor.save();
    res.status(200).json({ message: "Doctor details updated successfully" });
  } catch (error) {
    console.error("Error updating doctor details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found or deleted" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get all user data based on role
export const getAllUsersByRole = async (req, res) => {
  const { role } = req.params;
  try {
    const users = await User.find({ role }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
};
