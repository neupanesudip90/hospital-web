//auth middleware to verify JWT tokens
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object

    // Fetch user details based on role
    if (decoded.role === 'admin') {
      req.admin = await Admin.findById(decoded.id).select('-password');
    } else if (decoded.role === 'doctor') {
      req.doctor = await Doctor.findById(decoded.id).select('-password');
    } else if (decoded.role === 'patient') {
      req.patient = await Patient.findById(decoded.id).select('-password');
    }
    if (!req.admin && !req.doctor && !req.patient) {
      return res.status(404).json({ message: 'User not found' });
    }
      req.admin = req.admin || null; // Ensure req.admin is defined
      req.doctor = req.doctor || null; // Ensure req.doctor is defined
      req.patient = req.patient || null; // Ensure req.patient is defined

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;
