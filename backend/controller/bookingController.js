import Appointment from "../models/AppointmentModel.js";
import User from "../models/userModel.js";

export const bookAppointment = async (req, res) => {
    const {
       
      date,
      name,
      dob,
      gender,
      department,
      service,
      doctor,
      email,
      status,
      phone,
      additionalInfo,
    } = req.body;

  try {
      const appointment = new Appointment({
      date,
      name,
      dob,
        gender,
      department,
        service,
      doctor,
      email,
      status,
      phone,
      additionalInfo
    });

    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update appointment
export const updateAppointment = async (req, res) => {
  const { appointmentCode, status } = req.body;

  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentCode },
      { status },
      { new: true } // return the updated doc
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get specific appointment by ID
export const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete appointments
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }

    // Escape regex special characters
    const escapedDept = department.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const doctors = await User.find({
      role: "doctor",
      department: { $regex: new RegExp(`^${escapedDept}$`, "i") },
    }).select("-password");

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search appointment by name or email
export const searchAppointment = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const appointments = await Appointment.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error searching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Filter appointments by status
export const filterAppointment = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const filteredAppointments = await Appointment.find({ status });

    res.status(200).json(filteredAppointments);
  } catch (error) {
    console.error("Error filtering appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get 10 appointment which status is confirmed in oder from latest date
export const getLatestConfirmedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "confirmed" })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching latest confirmed appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
