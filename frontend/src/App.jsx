import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import AuthLayout from "./layout/authLayout";
import PrivateRoute from "./utils/privateRoutes/PrivateRoute";

// Lazy imports
const Home = lazy(() => import("./pages/Homepage/Home"));
const OurService = lazy(() => import("./pages/ourService/ourService"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const Doctors = lazy(() => import("./pages/doctors/Doctors"));
const News = lazy(() => import("./pages/News/News"));
const ContactUs = lazy(() => import("./pages/contactUs/contact"));
const Appointment = lazy(() => import("./pages/BookAppointment/Appointment"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Dashboard = lazy(() => import("./pages/DoctorDashboard/Dashboard"));
const Appointments = lazy(() => import("./pages/DoctorDashboard/Appointments"));
const Patients = lazy(() => import("./pages/DoctorDashboard/Patients"));
const AddAdmin = lazy(() => import("./pages/admin/AddAdmin"));
const AddDoctor = lazy(() => import("./pages/admin/AddDoctor"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));
const AllDoctors = lazy(() => import("./pages/userList/allDoctors"));
const UserProfile = lazy(() => import("./pages/profile/otherProfile"));
const UpdateDoctor = lazy(() => import("./pages/update/update"));
const AppointmentProfile = lazy(() =>
  import("./components/appointmentProfile")
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/ourservices", element: <OurService /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/doctors", element: <Doctors /> },
        { path: "/news", element: <News /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/bookappointment", element: <Appointment /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "doctor/dashboard",
          element: (
            <PrivateRoute roles={["doctor"]}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "admin/dashboard",
          element: (
            <PrivateRoute roles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/appointments",
          element: (
            <PrivateRoute roles={["doctor", "admin"]}>
              <Appointments />
            </PrivateRoute>
          ),
        },
        {
          path: "/patients",
          element: (
            <PrivateRoute roles={["doctor", "admin"]}>
              <Patients />
            </PrivateRoute>
          ),
        },
        {
          path: "/add-admin",
          element: (
            <PrivateRoute roles={["admin"]}>
              <AddAdmin />
            </PrivateRoute>
          ),
        },
        {
          path: "/add-doctor",
          element: (
            <PrivateRoute roles={["admin"]}>
              <AddDoctor />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute roles={["doctor", "admin"]}>
              <ProfilePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/alldoctors",
          element: (
            <PrivateRoute roles={["admin"]}>
              <AllDoctors />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: (
            <PrivateRoute roles={["admin"]}>
              <UserProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/edit/:id",
          element: (
            <PrivateRoute roles={["admin"]}>
              <UpdateDoctor />
            </PrivateRoute>
          ),
        },
        {
          path: "/patient/:id",
          element: (
            <PrivateRoute roles={["admin", "doctor"]}>
              <AppointmentProfile />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
