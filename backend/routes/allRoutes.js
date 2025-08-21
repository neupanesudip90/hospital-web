//admin routes
import express from "express";
import {
  registerAdmin,
  registerDoctor,
  registerPatient,
  updateAdminDetails,
  updateDoctorDetails,
  getUserDetails,
  getAllUsersByRole,
  deleteUserAccount,
  authUserDetails,
} from "../controller/userController.js";
import { loginUser } from "../controller/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  bookAppointment,
  updateAppointment,
  getDoctorsByDepartment,
  getAllAppointments,
  getAppointmentById,
  deleteAppointment,
  searchAppointment,
  filterAppointment,
  getLatestConfirmedAppointments,
} from "../controller/bookingController.js";
import {
  validateAdminRegister,
  validateLogin,
  validateDoctorRegister,
  validatePatientRegister,
  validateRequest,
  validateAdminUpdate,
  validateAppointmentBooking,
} from "../middlewares/validation.js";
import { getNews } from "../controller/newsController.js";
import {
  getTopHeadlines,
} from "../controller/newsController.js";
import upload from "../middlewares/cloudinaryUpload.js";

const router = express.Router();

// Register admin
router.post(
  "/register",
  upload.single("profilePicture"),
  validateAdminRegister,
  validateRequest,
  registerAdmin
);
//update admin details
router.put(
  "/admin/update",
  validateAdminUpdate,
  validateRequest,
  authMiddleware,
  updateAdminDetails
);

//register doctor
router.post(
  "/doctor/register",
  upload.single("profilePicture"),
  validateDoctorRegister,
  validateRequest,
  registerDoctor
);

//update doctor details by id
router.put(
  "/doctor/:id",
  upload.single("profilePicture"),
  validateRequest,
  authMiddleware,
  updateDoctorDetails
);

// Register patient
router.post(
  "/patient/register",
  validatePatientRegister,
  validateRequest,
  registerPatient
);

//get user details by id
router.get("/profile/:id", validateRequest, authMiddleware, getUserDetails);

//get all users by role
router.get("/all/:role", validateRequest, getAllUsersByRole);

//get auth details
router.get("/auth", validateRequest, authMiddleware, authUserDetails);

//delete user account
router.delete("/user/:id", validateRequest, authMiddleware, deleteUserAccount);

// Login
router.post("/login", validateLogin, validateRequest, loginUser);

//news routes
router.get("/news", getNews);

//top headlines route
router.get("/news/top-headlines", getTopHeadlines);


//route to get doctor by their department
router.get(
  "/doctors/department/:department",
  validateRequest,
  getDoctorsByDepartment
);

//route to book an appointment
router.post(
  "/appointments/book",
  validateAppointmentBooking,
  validateRequest,
  bookAppointment
);

//route to update an appointment
router.put("/appointments/update", validateRequest, updateAppointment);

//route to get all appointments
router.get("/appointments", validateRequest, getAllAppointments);

//route to get appointment details
//route to searchAppointment
router.get("/appointments/search", validateRequest, searchAppointment);

//route to filter Appointment
router.get("/appointments/filter", validateRequest, filterAppointment);
//route to get latest 5 confirmed appointments
router.get("/appointments/latest-confirmed", validateRequest, getLatestConfirmedAppointments);
router.get("/appointments/:id", validateRequest, getAppointmentById);

//route to delete an appointment
router.delete("/appointments/:id", validateRequest, deleteAppointment);



export default router;
