import React from "react";
import doctor from "../../assets/doctor4.jpg";
import logo from "../../assets/clinicLogo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, } = useSelector(
    (state) => state.auth
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        // Redirect based on role
        if (res.user.role === "admin") navigate("/admin/dashboard");
        else if (res.user.role === "doctor") navigate("/doctor/dashboard");
        else navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const getFieldError = (field) => {
    if (!error || !Array.isArray(error.errors)) return "";
    const fieldError = error.errors.find((err) => err.path === field);
    return fieldError ? fieldError.msg : "";
  };

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
              Welcome to <span className="font-bold">Lifeline</span> Medical
              Management System
            </h2>
            <p className="text-sm mt-2">
              Cloud Based Streamline Hospital Management system with a
              centralized user-friendly platform.
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} className="w-20 h-auto" alt="logo" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your credentials to login to your account
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Global error */}
            {error?.message && (
              <p className="text-red-500 text-center mb-4">{error.message}</p>
            )}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {getFieldError("email") && (
                <p className="text-red-500 text-sm">{getFieldError("email")}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {getFieldError("password") && (
                <p className="text-red-500 text-sm">{getFieldError("password")}</p>
              )}
            </div>
            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
