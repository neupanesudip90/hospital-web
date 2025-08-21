import React from "react";
import { getUserById,deleteUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import cover from "../assets/cover.jpg";
import BackButton from "./backButton";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
    const user = useSelector((state) => state.user.selectedUser);
    
  React.useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

   const handleDelete = async () => {
     const confirm = window.confirm(
       "Are you sure you want to delete this user?"
     );
     if (!confirm) return;

     try {
       const resultAction = await dispatch(deleteUser(id));

       if (deleteUser.fulfilled.match(resultAction)) {
         alert("User deleted successfully ✅");
           // Optionally redirect or refresh list
           navigate("/alldoctors");
       } else {
         const errorMsg = resultAction.payload?.message || "Delete failed";
         alert(errorMsg);
       }
     } catch (error) {
       console.error("Unexpected error:", error);
       alert("An unexpected error occurred.");
     }
   };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex items-start justify-between mb-4">
        <BackButton className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md" />
        <div className="flex space-x-2">
          <Link
            to={`/edit/${id}`}
            className="p-2 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        {/* Cover + Profile */}
        <div className="relative h-52 sm:h-64 md:h-80">
          <img
            src={user?.coverPicture || cover}
            alt="cover"
            className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-80"
          />
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 transform -translate-x-1/2">
            <img
              src={
                user?.profilePicture ||
                "https://via.placeholder.com/150?text=Profile"
              }
              alt={user?.name}
              className="w-42 h-42 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
          </div>
        </div>

        {/* Top Section: Name, Role, Specialization, Bio */}
        <div className="mt-20 sm:mt-24 text-center px-4 sm:px-8 pb-10">
          <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold text-gray-900 tracking-tight bg-clip-text  ">
            {user?.name ? user.name.toUpperCase() : "User Name"}
          </h2>
          <p className="text-gray-700 mt-3 text-base sm:text-lg font-semibold">
            {user?.role ? user.role.toUpperCase() : "Role"}
          </p>

          {/* Bio */}
          {user?.bio && (
            <p className="text-gray-700 mt-3 text-md sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              {user.bio}
            </p>
          )}

          <div className="flex justify-center items-center space-x-4 mt-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-pink-600" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700" />
            </a>
          </div>
        </div>

        {/* Bottom Section: Info, Experience, Qualifications */}
        <div className="px-4 sm:px-8 pb-12 space-y-10 sm:space-y-12">
          {/* Contact Info */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-7 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-gray-800 font-bold text-xl sm:text-2xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700 text-sm sm:text-base">
              <p className="flex items-center">
                <span className="font-semibold mr-2">Phone:</span>
                {user?.phone || "Not provided"}
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">Email:</span>
                {user?.email || "Not provided"}
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">License No:</span>
                {user?.licenseNumber || "Not provided"}
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">Gender:</span>
                {user?.gender || "Not specified"}
              </p>
            </div>
          </div>

          {/* Work / Experience */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-7 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-gray-800 font-bold text-xl sm:text-2xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Work & Experience
            </h3>
            <p className="text-gray-700 text-sm sm:text-base flex items-center">
              <span className="font-semibold mr-2">Department:</span>
              {user?.department || "Not specified"}
            </p>
            <p className="text-gray-700 text-sm sm:text-base flex items-center mt-2">
              <span className="font-semibold mr-2">Experience:</span>
              {user?.experienceYears || 0} years
            </p>
          </div>

          {/* Qualifications */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-7 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-gray-800 font-bold text-xl sm:text-2xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Qualifications
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-3">
              {user?.qualifications && user.qualifications.length > 0 ? (
                user.qualifications.map((q, idx) => (
                  <li key={idx}>{q.toUpperCase()}</li>
                ))
              ) : (
                <li className="text-gray-500">No qualifications added</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
