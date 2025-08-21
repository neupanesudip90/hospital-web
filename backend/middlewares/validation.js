//this is a middleware for validating request data
import { body, validationResult } from "express-validator";

//this is for register patient and to get information of patient
export const validatePatientRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("phone")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

//this is for register doctor and to get information of doctor
export const validateDoctorRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("specialization").notEmpty().withMessage("Specialization is required"),
  body("qualifications").notEmpty().withMessage("Qualifications is required"),
  body("licenseNumber").notEmpty().withMessage("Licence number is required"),
  body("experienceYears")
    .isNumeric()
    .withMessage("Experience must be a number"),
  body("dob").isDate().withMessage("Invalid date format"),
  body("phone")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
  body("profilePicture").custom((value, { req }) => {
    if (!req.file) throw new Error("Profile image is required");
    return true;
  }),
];

//this is for register admin and to get information of admin
export const validateAdminRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .isNumeric()
    .isLength({ min: 6, max: 10 })
    .withMessage("Phone number must be 10 characters long"),
  body("dob").optional().isDate().withMessage("Invalid date format"),
  body("bio")
    .optional()
    .isString()
    .withMessage("Bio must be a string"),
  body("profilePicture")
    .optional()
    .isString()
    .withMessage("Profile picture must be a string"),
  body("qualifications")
    .optional()
    .notEmpty()
    .withMessage("Qualifications must be an array"),
  body("dob").optional().isDate().withMessage("Invalid date format"),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
];
//this is for validating admin update requests
export const validateAdminUpdate = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long"),
];

//this is for validating login requests
export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

//this for appointment booking validation
export const validateAppointmentBooking = [
  body("date").isDate().withMessage("Invalid date format"),
  body("name").notEmpty().withMessage("Name is required"),
  body("dob").isDate().withMessage("Invalid date format"),
  body("gender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("department")
    .notEmpty()
    .withMessage("Department is required"),
  body("service")
    .notEmpty()
    .withMessage("Service is required"),
  body("doctor")
    .notEmpty()
    .withMessage("Doctor is required"),
  body("phone")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long"),
  body("additionalInfo").optional().isString().withMessage("Additional information must be a string"),
];

//this is for validating request data
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
