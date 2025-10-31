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

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

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

### Data Models

#### User Model
- **Fields**: name, email, password, phone, gender, DOB, address, role
- **Doctor-specific**: specialization, department, experience, qualifications, license number
- **Patient-specific**: blood group, emergency contact
- **Common**: profile picture, bio
- **Roles**: admin, doctor, patient

#### Appointment Model
- **Fields**: appointmentCode, name, email, phone, DOB, department, service, doctor, gender, date
- **Status**: pending, confirmed, completed, cancelled
- **Auto-generated**: appointmentCode (APT-YYYY###)

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Cloudinary account (for image uploads)
- News API key (for news integration)

### Clone Repository
```bash
git clone https://github.com/neupanesudip90/hospital-web.git
cd hospital-web
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```bash
touch .env
```

4. Configure environment variables (see [Environment Variables](#-environment-variables) section)

5. Start backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:3000` (or your configured PORT)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory (if needed):
```bash
touch .env
```

4. Start development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite default port)

### Build for Production

#### Frontend Build
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `dist/` directory.

#### Preview Production Build
```bash
npm run preview
```

---

## 🔐 Environment Variables

### Backend Environment Variables (`backend/.env`)

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/hospital-db
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# News API Configuration
NEWS_API_KEY=your_newsapi_key_here
```

### Frontend Environment Variables (`frontend/.env`)

```env
# API Base URL
VITE_API_URL=http://localhost:3000/api
# Or for production:
# VITE_API_URL=https://your-backend-domain.com/api
```

### How to Obtain API Keys

1. **MongoDB Atlas**:
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string from "Connect" → "Connect your application"

2. **Cloudinary**:
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Navigate to Dashboard
   - Copy Cloud Name, API Key, and API Secret

3. **News API**:
   - Sign up at [newsapi.org](https://newsapi.org/)
   - Get your free API key from the dashboard
   - Free tier: 100 requests/day

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### Authentication & User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register admin with profile picture | No |
| POST | `/doctor/register` | Register doctor with profile picture | No |
| POST | `/patient/register` | Register patient | No |
| POST | `/login` | User login (all roles) | No |
| GET | `/auth` | Get authenticated user details | Yes |
| GET | `/profile/:id` | Get user profile by ID | Yes |
| GET | `/all/:role` | Get all users by role (admin/doctor/patient) | No |
| PUT | `/admin/update` | Update admin details | Yes (Admin) |
| PUT | `/doctor/:id` | Update doctor details with picture | Yes |
| DELETE | `/user/:id` | Delete user account | Yes |

#### Appointments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/appointments/book` | Book new appointment | No |
| GET | `/appointments` | Get all appointments | No |
| GET | `/appointments/:id` | Get appointment by ID | No |
| GET | `/appointments/search` | Search appointments | No |
| GET | `/appointments/filter` | Filter appointments by criteria | No |
| GET | `/appointments/latest-confirmed` | Get 5 latest confirmed appointments | No |
| PUT | `/appointments/update` | Update appointment status | No |
| DELETE | `/appointments/:id` | Delete appointment | No |

#### Doctors

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/doctors/department/:department` | Get doctors by department | No |

#### News

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/news` | Get paginated news | No |
| GET | `/news/top-headlines` | Get top US headlines | No |
| GET | `/news/top-health-headlines` | Get top health headlines | No |

### Request/Response Examples

#### Register Admin
```bash
POST /api/register
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "admin@hospital.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "gender": "Male",
  "dob": "1985-05-15",
  "address": "123 Hospital St, City",
  "role": "admin",
  "profilePicture": <file>
}

Response:
{
  "message": "Admin registered successfully",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "admin@hospital.com",
    "role": "admin",
    ...
  }
}
```

#### Login
```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@hospital.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "admin@hospital.com",
    ...
  }
}
```

#### Book Appointment
```bash
POST /api/appointments/book
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "dob": "1990-03-20",
  "gender": "Female",
  "department": "Cardiology",
  "service": "Consultation",
  "doctor": "Dr. Robert Johnson",
  "date": "2025-11-15",
  "additionalInfo": "First time visit"
}

Response:
{
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "64def456...",
    "appointmentCode": "APT-2025001",
    "status": "pending",
    ...
  }
}
```

#### Update Appointment Status
```bash
PUT /api/appointments/update
Content-Type: application/json

{
  "appointmentId": "64def456...",
  "status": "confirmed"
}

Response:
{
  "message": "Appointment updated successfully",
  "appointment": {
    "status": "confirmed",
    ...
  }
}
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is configured for Vercel deployment with `vercel.json`:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from frontend directory:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel Dashboard:
   - `VITE_API_URL`: Your backend API URL

### Backend Deployment Options

#### Option 1: Railway
1. Sign up at [railway.app](https://railway.app/)
2. Create new project from GitHub
3. Add environment variables
4. Deploy

#### Option 2: Render
1. Sign up at [render.com](https://render.com/)
2. Create Web Service from GitHub
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables

#### Option 3: Heroku
1. Install Heroku CLI
2. Create `Procfile` in backend:
```
web: node backend/app.js
```
3. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

### Database Deployment

**MongoDB Atlas** (Recommended):
1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Set up database user
3. Whitelist IP addresses (0.0.0.0/0 for all IPs)
4. Get connection string
5. Update `MONGO_URI` in backend environment variables

---

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
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

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
3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

---

## 📝 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 Hospital Management System

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
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

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) - Database platform
- [Express.js](https://expressjs.com/) - Backend framework
- [React](https://reactjs.org/) - Frontend library
- [Node.js](https://nodejs.org/) - Runtime environment
- [Material-UI](https://mui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [News API](https://newsapi.org/) - News data provider
- [Vite](https://vitejs.dev/) - Build tool

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

