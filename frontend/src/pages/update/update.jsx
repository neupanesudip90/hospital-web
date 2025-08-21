import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDoctor } from "../../redux/userSlice";
import { useParams } from "react-router-dom";
import Sidepanel from "../../components/sidepanel";
import API from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton.jsx";

function UpdateDoctor() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    qualifications: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ fetch from /user/:id instead of /doctor/:id
        const { data } = await API.get(`/profile/${id}`);

        setUserData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          qualifications: data.qualifications || "",
          specialization: data.specialization || "",
          experience: data.experienceYears || "",
          licenseNumber: data.licenseNumber || "",
        });

        if (data.profilePicture) {
          setPreviewImage(data.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (profileImage) formData.append("profilePicture", profileImage);

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const resultAction = await dispatch(
        updateDoctor({ id: id, data: formData })
      );

      if (updateDoctor.fulfilled.match(resultAction)) {
        alert("Doctor updated successfully ✅");
        navigate(`/profile/${id}`);
      } else {
        const errorMsg =
          resultAction.payload?.errors?.map((err) => err.msg).join("\n") ||
          resultAction.payload?.message ||
          "Update failed";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col gap-5 p-3">
      {/* Sidebar */}
      <div className="lg:w-1/5 w-full  shadow-md mb-15">
        <Sidepanel />
      </div>

      {/* Main Section */}
      <div className="lg:w-4/5 w-full">
        <div className="w-full max-w-4xl flex justify-start items-center mb-4">
          <BackButton className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md" />
        </div>
        <div className="container mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-gray-800">Update Doctor</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Profile Picture */}
          <div className="flex items-center lg:flex-row flex-col gap-5 space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex  items-center justify-center bg-gray-100">
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
            <input type="file" accept="image/*" onChange={handleImageChange} />
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
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Phone Number", name: "phone", type: "text" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["Male", "Female", "Other"],
                required: true,
              },
              { label: "Qualification", name: "qualifications", type: "text" },
              {
                label: "Specialization",
                name: "specialization",
                type: "text",
              },
              {
                label: "Experience (Years)",
                name: "experience",
                type: "number",
              },
              {
                label: "License Number",
                name: "licenseNumber",
                type: "text",
              },
            ].map(({ label, name, type, options }) => (
              <div key={name}>
                <label className="block text-gray-700 mb-1">{label}</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={userData[name]}
                    onChange={handleInputChange}
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
                    type={type}
                    name={name}
                    value={userData[name]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="ml-2 px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDoctor;
