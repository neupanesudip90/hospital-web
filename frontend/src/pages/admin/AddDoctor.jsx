import React, { useState } from "react";
import Sidepanel from "../../components/sidepanel";
import { registerDoctor } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    qualification: "",
    department: "",
    specialization: "",
    experienceYears: "",
    licenseNumber: "",
    bio: "",
  });

  // Handle profile image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // safety check
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle form input changes for all doctorData fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data with image using FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData object
    const formData = new FormData();

    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }

    // Append all doctor fields to formData
    Object.entries(doctorData).forEach(([key, value]) => {
      // Map qualification to qualifications for backend compatibility
      if (key === "qualification") {
        formData.append("qualifications", value);
      }
      // Map experienceYears to experience
      else if (key === "experienceYears") {
        formData.append("experienceYears", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const resultAction = await dispatch(registerDoctor(formData));
      if (registerDoctor.fulfilled.match(resultAction)) {
        alert("Doctor registered successfully");
        navigate("/admin/dashboard");
      } else {
        alert(resultAction.payload?.message || "Failed to register doctor");
        console.error("Registration error:", resultAction.payload);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full bg-white shadow-md mb-15">
        <Sidepanel />
      </div>

      {/* Main Section */}
      <div className="lg:w-4/5 w-full  md:p-6">
        <div className="container mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Add Doctor</h2>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 space-y-6"
            encType="multipart/form-data"
          >
            {/* Profile Picture */}
            <div className="flex lg:flex-row flex-col items-center space-x-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                             file:rounded-full file:border-0 file:text-sm 
                             file:font-semibold file:bg-blue-50 file:text-blue-700 
                             hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Doctor Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Full Name",
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  required: true,
                },
                { label: "Phone Number", name: "phone", type: "text" },
                { label: "Date of Birth", name: "dob", type: "date" },
                {
                  label: "Gender",
                  name: "gender",
                  type: "select",
                  options: ["Male", "Female", "Other"],
                  required: true,
                },
                { label: "Qualification", name: "qualification", type: "text" },
                {
                  label: "Department",
                  name: "department",
                  type: "select",
                  options: [
                    "Cardiology",
                    "Neurology",
                    "Orthopedics",
                    "Pediatrics",
                    "General",
                  ],
                },
                {
                  label: "Specialization",
                  name: "specialization",
                  type: "text",
                },
                {
                  label: "Experience (Years)",
                  name: "experienceYears",
                  type: "number",
                },
                {
                  label: "License Number",
                  name: "licenseNumber",
                  type: "text",
                },
              ].map(({ label, name, type, options, required }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-medium mb-2">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={doctorData[name]}
                      onChange={handleInputChange}
                      required={required}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">Select {label}</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={name}
                      type={type}
                      value={doctorData[name]}
                      onChange={handleInputChange}
                      required={required}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                placeholder="Write a short bio..."
                value={doctorData.bio}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
