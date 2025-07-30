//admin routes
import express from 'express';
import {registerAdmin , getAdminDetails, updateAdminDetails, deleteAdminAccount, authAdminDetails } from '../controller/adminController.js';
import { registerDoctor,getDoctorDetails,authDoctorDetails,updateDoctorDetails,getAllDoctors , deleteDoctorAccount } from '../controller/doctorController.js';
import {
  registerPatient,
  getAllPatients,
  getPatientDetails,
  authPatientDetails,
  updatePatientDetails,
  deletePatientAccount
} from "../controller/patientController.js";
import { loginUser } from '../controller/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {  
  validateAdminRegister,
  validateLogin,
  validateDoctorRegister,
  validatePatientRegister,
  validateRequest,
  validateAdminUpdate 
} from "../middlewares/validation.js";
import { getNews } from "../controller/newsController.js";
import { getTopHeadlines, getNewsByCategory } from "../controller/newsController.js";


const router = express.Router();

// Register admin
router.post('/register', validateAdminRegister, validateRequest, registerAdmin);
//update admin details
router.put('/admin/update', validateAdminUpdate, validateRequest,authMiddleware, updateAdminDetails);
//get admin details
router.get('/admin/details', validateRequest,authMiddleware, getAdminDetails);
//delete admin account
router.delete('/admin/delete', validateRequest, authMiddleware, deleteAdminAccount);
//get admin details with auth token for profile
router.get('/admin/profile', validateRequest, authMiddleware, authAdminDetails);

//register doctor
router.post('/doctor/register', validateDoctorRegister, validateRequest, registerDoctor);
//get all doctors list
router.get('/alldoctor', validateRequest, authMiddleware, getAllDoctors);
//get doctor details by id
router.get('/doctor/:id', validateRequest, getDoctorDetails);
//get doctor details with auth token for profile
router.get('/doctor/profile', validateRequest, authMiddleware, authDoctorDetails);
//update doctor details by id
router.put('/doctor/:id', validateRequest, authMiddleware, updateDoctorDetails);
//delete doctor account
router.delete('/doctor/:id', validateRequest, authMiddleware, deleteDoctorAccount);

// Register patient
router.post('/patient/register', validatePatientRegister, validateRequest, registerPatient);
//get all patients list
router.get('/allpatients', validateRequest, authMiddleware, getAllPatients);
//get patient details by id
router.get('/patient/:id', validateRequest, getPatientDetails);
//get patient details with auth token for profile
router.get('/patient/profile', validateRequest, authMiddleware, authPatientDetails);
//update patient details by id
router.put('/patient/:id', validateRequest, authMiddleware, updatePatientDetails);
//delete patient account
router.delete('/patient/:id', validateRequest, authMiddleware, deletePatientAccount);

// Login 
router.post('/login', validateLogin, validateRequest, loginUser);

//news routes
router.get('/news', getNews);

//top headlines route
router.get('/news/top-headlines', getTopHeadlines);

//news by category route
router.get('/news/category/:category', getNewsByCategory);

export default router;

