import React from "react";
import doctor from "../../assets/doctor2.jpg";
import logo from "../../assets/clinicLogo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerPatient } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords and Confirm password do not match");
      return;
    }
    dispatch(registerPatient({ name, email, phone, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // Extract field-specific errors
  const getFieldError = (field) => {
    if (!error || !Array.isArray(error.errors)) return "";
    const fieldError = error.errors.find((err) => err.path === field);
    return fieldError ? fieldError.msg : "";
  };

  // Password visibility toggle
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        {/* Left Section */}
        <div className="hidden md:flex flex-col w-1/2 bg-blue-700">
          <img
            src={doctor}
            className="w-full h-1/2 object-cover"
            alt="doctor"
          />
          <div className="p-8 text-center text-white">
            <img src={logo} className="w-24 h-auto mx-auto mb-4" alt="logo" />
            <h2 className="text-2xl font-semibold mb-2">
              Join <span className="font-bold">Invision</span> Hospital
              Management System
            </h2>
            <p className="text-sm mt-2">
              Create an account to access all features and manage appointments
              effortlessly.
            </p>
          </div>
        </div>

        {/* Right Section - Register Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} className="w-20 h-auto" alt="logo" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Fill in the details to create your account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Global error (string only) */}
            {error?.message && (
              <p className="text-red-500 text-center mb-4">{error.message}</p>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("name") && (
                <p className="text-red-500 text-sm">{getFieldError("name")}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("email") && (
                <p className="text-red-500 text-sm">{getFieldError("email")}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("phone") && (
                <p className="text-red-500 text-sm">{getFieldError("phone")}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("password") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("password")}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {getFieldError("confirmPassword") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("confirmPassword")}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
