//admin controller
import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';


// Register a new admin
export const registerAdmin = async (req, res) => {
  const { name, email, password, phone,role } = req.body; // Destructure the request body

  try {
    // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 
    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
        role: role || 'admin' // Default role is 'admin'
      
    });
    // Save the admin to the database
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//get admin details by id
export const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//get admin details with auth token for profile
export const authAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update admin details
export const updateAdminDetails = async (req, res) => {
  const { name, email, phone } = req.body; // Destructure the request body

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete admin account
export const deleteAdminAccount = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin account deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin account:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

