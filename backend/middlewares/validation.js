//this is a middleware for validating request data
import { body, validationResult } from 'express-validator';

//this is for register patient and to get information of patient
export const validatePatientRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isNumeric().withMessage('Age must be a number'),
    body('phone').isNumeric().isLength({ min: 6, max: 10 }).withMessage('Phone number must be between 6 and 10 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address').notEmpty().withMessage('Address is required'),
    body('medicalHistory').notEmpty().withMessage('Medical history is required'),
    body('emergencyContact.name').notEmpty().withMessage('Emergency contact name is required'),
    body('emergencyContact.phone').notEmpty().withMessage('Emergency contact phone is required'),
    body('emergencyContact.relationship').notEmpty().withMessage('Emergency contact relationship is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender')
];


//this is for register doctor and to get information of doctor
export const validateDoctorRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("specialization").notEmpty().withMessage("Specialization is required"),
  body("qualifications")
    .isArray()
    .withMessage("Qualifications must be an array"),
  body("licenceNumber").notEmpty().withMessage("Licence number is required"),
  body("experience").isNumeric().withMessage("Experience must be a number"),
  body("phone")
    .isNumeric()
    .isLength({ min: 6, max: 10 })
    .withMessage("Phone number must be between 6 and 10 characters long"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
  body("availability").isArray().withMessage("Availability must be an array"),
  body("profilePicture")
    .optional()
    .isString()
    .withMessage("Profile picture must be a string"),
];


//this is for register admin and to get information of admin
export const validateAdminRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isNumeric().isLength({ min: 6, max: 10 }).withMessage('Phone number must be between 6 and 10 characters long')]
//this is for validating admin update requests
export const validateAdminUpdate = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone")
    .isNumeric()
    .isLength({ min: 6, max: 10 })
    .withMessage("Phone number must be between 6 and 10 characters long"),
];

//this is for validating login requests
export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};