import React, { useState, useEffect } from "react";
import Sidepanel from "../../components/sidepanel";
import { registerAdmin } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    qualification: "",
    bio: "",
  });

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }

    Object.entries(adminData).forEach(([key, value]) => {
      // Map qualification to match backend field
      if (key === "qualification") {
        formData.append("qualifications", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const resultAction = await dispatch(registerAdmin(formData));

      if (registerAdmin.fulfilled.match(resultAction)) {
        alert("Admin registered successfully");
        // Reset form
        setAdminData({
          name: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
          gender: "",
          qualification: "",
          bio: "",
        });
        setProfileImage(null);
        setPreviewImage(null);
        navigate("/admin/dashboard");
      } else {
        const errorMsg =
          resultAction.payload?.errors?.map((err) => err.msg).join("\n") ||
          resultAction.payload?.message ||
          "Failed to register admin";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col  bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full bg-white shadow-md mb-15">
        <Sidepanel />
      </div>

      {/* Main Section */}
      <div className="lg:w-4/5 w-full mt-5 md:p-6">
        <div className="container mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Add Admin</h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 space-y-6"
            encType="multipart/form-data"
          >
            {/* Profile Picture */}
            <div className="flex lg:flex-row flex-col items-center space-x-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
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

            {/* Admin Info */}
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
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "text",
                  required: true,
                },
                {
                  label: "Date of Birth",
                  name: "dob",
                  type: "date",
                  required: true,
                },
                {
                  label: "Gender",
                  name: "gender",
                  type: "select",
                  options: ["Male", "Female", "Other"],
                  required: true,
                },
                {
                  label: "Qualification",
                  name: "qualification",
                  type: "text",
                  required: true,
                },
              ].map(({ label, name, type, options, required }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-medium mb-2">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={adminData[name]}
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
                      value={adminData[name]}
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
                value={adminData.bio}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg shadow text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                }`}
              >
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
