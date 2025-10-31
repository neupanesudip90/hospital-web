# 🏥 Hospital Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

A comprehensive, full-stack Hospital Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This modern web application streamlines hospital operations including patient registration, doctor management, appointment scheduling, and medical record handling with a secure, role-based authentication system.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---
---

## 🌟 Overview

The Hospital Management System is a production-ready web application designed to digitize and streamline hospital operations. It provides a unified platform for administrators, doctors, and patients to manage healthcare services efficiently. With role-based access control, real-time appointment management, and integrated news feeds, this system offers a complete solution for modern healthcare facilities.

**Key Highlights:**
- 🔐 Secure JWT-based authentication with role-based authorization
- 📱 Fully responsive design for desktop, tablet, and mobile devices
- 🎨 Modern UI built with Material-UI and Tailwind CSS
- 📊 Real-time dashboard for administrators and doctors
- 🌐 RESTful API architecture with comprehensive error handling
- ☁️ Cloud-based image storage with Cloudinary integration
- 📰 Integrated health news feed from external API

---

## ✨ Features

### 👨‍💼 Admin Features
- **User Management**: Register and manage doctors, staff, and administrators
- **Department Management**: Organize doctors by specialization and departments
- **Appointment Oversight**: View, filter, and manage all hospital appointments
- **Patient Records**: Access and update comprehensive patient information
- **Doctor Profiles**: Update doctor details, qualifications, and profile pictures
- **Analytics Dashboard**: View latest confirmed appointments and system statistics
- **User Deletion**: Remove user accounts with proper authorization

### 🩺 Doctor Features
- **Personal Dashboard**: View and manage daily appointment schedules
- **Appointment Management**: Accept or reject appointment requests
- **Patient Information**: Access detailed patient profiles and medical history
- **Profile Management**: Update personal information, specialization, and credentials
- **Department-based Organization**: Automatically categorized by medical specialty
- **Appointment Search & Filter**: Find appointments by date, status, or patient

### 👤 Patient Features
- **User Registration**: Secure account creation with email verification
- **Appointment Booking**: Schedule appointments with preferred doctors and departments
- **Doctor Selection**: Browse doctors by specialization and department
- **Profile Management**: Update personal information and emergency contacts
- **Appointment Tracking**: View appointment status (pending, confirmed, completed, cancelled)
- **Health News**: Access latest health-related news and articles

### 🔧 General System Features
- **Role-Based Access Control (RBAC)**: Three-tier authorization system (Admin, Doctor, Patient)
- **Secure Authentication**: JWT-based session management with bcrypt password hashing
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **RESTful API**: Well-structured endpoints with validation and error handling
- **Image Upload**: Cloudinary integration for profile picture management
- **News Integration**: Real-time health news from external API
- **Search & Filter**: Advanced appointment search and filtering capabilities
- **Data Validation**: Express-validator middleware for input validation
- **CORS Support**: Cross-origin resource sharing for frontend-backend communication

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.0 | Core UI library |
| **Redux Toolkit** | 2.8.2 | State management |
| **React Router DOM** | 7.7.1 | Client-side routing |
| **Vite** | 7.0.4 | Build tool and dev server |
| **Material-UI (MUI)** | 7.2.0 | Component library |
| **Tailwind CSS** | 4.1.11 | Utility-first CSS framework |
| **Axios** | 1.11.0 | HTTP client |
| **Framer Motion** | 12.23.12 | Animation library |
| **React Toastify** | 11.0.5 | Toast notifications |
| **Recharts** | 3.1.0 | Data visualization |
| **Swiper** | 11.2.10 | Touch slider component |
| **React Icons** | 5.5.0 | Icon library |
| **React Paginate** | 8.3.0 | Pagination component |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | >= 16.0.0 | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | 6.17.0 | NoSQL database |
| **Mongoose** | 8.16.4 | MongoDB ODM |
| **JWT** | 9.0.2 | Authentication tokens |
| **bcryptjs** | 3.0.2 | Password hashing |
| **Cloudinary** | 1.29.0 | Cloud image storage |
| **Multer** | 2.0.2 | File upload middleware |
| **Express Validator** | 7.2.1 | Request validation |
| **CORS** | 2.8.5 | Cross-origin support |
| **dotenv** | 17.2.0 | Environment variables |
| **Nodemon** | 3.1.10 | Development auto-reload |

### Development Tools
- **ESLint**: Code linting and style enforcement
- **Vercel**: Frontend deployment platform
- **Git**: Version control

---

## 🏗️ Architecture

```
hospital-web/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API integration layer
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable React components
│   │   ├── layout/          # Layout components (Navbar, Footer, etc.)
│   │   ├── pages/           # Page components for routing
│   │   ├── redux/           # Redux store and slices
│   │   ├── utils/           # Utility functions and helpers
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Public static assets
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Node.js backend application
│   ├── config/              # Configuration files
│   │   ├── dbConnect.js     # MongoDB connection
│   │   └── cloudinary.js    # Cloudinary configuration
│   ├── controller/          # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── bookingController.js
│   │   └── newsController.js
│   ├── middlewares/         # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── validation.js
│   │   └── cloudinaryUpload.js
│   ├── models/              # Mongoose schemas
│   │   ├── userModel.js
│   │   └── AppointmentModel.js
│   ├── routes/              # API routes
│   │   └── allRoutes.js
│   ├── app.js               # Express app configuration
│   └── package.json         # Backend dependencies
│
├── .gitignore               # Git ignore rules
└── readme.md                # Project documentation
```
--

## 📁 Project Structure

### Frontend Pages
- **Homepage**: Landing page with hero section and services overview
- **Our Services**: Detailed list of hospital services
- **About Us**: Information about the hospital
- **Doctors**: Browse doctors by department
- **News**: Health news and articles
- **Contact**: Contact form and information
- **Book Appointment**: Appointment booking form
- **Login/Register**: Authentication pages
- **Dashboard**: Role-specific dashboards (Admin/Doctor/Patient)
- **Profile**: User profile management

### Backend Controllers
- **authController**: Login and authentication logic
- **userController**: User registration, profile management, CRUD operations
- **bookingController**: Appointment management, search, filter
- **newsController**: External news API integration

### Key Frontend Components
- **Navbar/MobileNavbar**: Responsive navigation
- **Footer**: Site footer
- **Sidebar/Sidepanel**: Dashboard navigation
- **Charts**: Data visualization components
- **BreadCrumb**: Navigation breadcrumb
- **ConfirmModel**: Confirmation dialog
- **Slider**: Image carousel

---

## 🤝 Contributing

We welcome contributions to improve the Hospital Management System! Here's how you can contribute:

### Getting Started
1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/hospital-web.git
   ```



### Making Changes
1. Make your changes in your feature branch
2. Test the changes locally:
   ```bash
   # Backend tests
   cd backend
   npm start
   
   # Frontend tests
   cd frontend
   npm run dev
   ```


---

## 📝 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 Hospital Management System

```

---

## 📧 Contact

### Project Maintainer
**Sudip Neupane**

- GitHub: [@neupanesudip90](https://github.com/neupanesudip90)
- Repository: [hospital-web](https://github.com/neupanesudip90/hospital-web)

### Support
For questions, issues, or suggestions:
1. Open an issue on GitHub
2. Check existing issues for solutions
3. Contribute to discussions

---

---

## 📊 Project Status

- ✅ Core functionality complete
- ✅ Authentication & authorization
- ✅ Appointment management
- ✅ User management
- ✅ News integration
- ✅ Responsive design
- 🚧 Additional features in progress

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Sudip Neupane](https://github.com/neupanesudip90)

</div>


