// controllers/authController.js
import Admin from '../models/adminModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Search in all collections
    const user =
      (await Admin.findOne({ email })) ||
      (await Doctor.findOne({ email })) ||
      (await Patient.findOne({ email }));

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

