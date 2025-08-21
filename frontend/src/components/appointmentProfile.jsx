import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentById,
  deleteAppointment,
} from "../redux/appoitnmentSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "./backButton";
import cover from "../assets/cover.jpg";
import doctor from "../assets/doctor2.jpg";
import Sidepanel from "./sidepanel";

const AppointmentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointment = useSelector(
    (state) => state.appointments.selectedAppointment
  );

  React.useEffect(() => {
    if (id) dispatch(getAppointmentById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      const resultAction = await dispatch(deleteAppointment(id));
      if (deleteAppointment.fulfilled.match(resultAction)) {
        alert("Appointment deleted successfully ✅");
        navigate("/patients");
      } else {
        alert(resultAction.payload?.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unexpected error occurred");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 bg-white shadow-md">
        <Sidepanel />
      </div>

      {/* Back and actions */}
      <div className="min-h-screen w-4/5 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center  ">
        {/* Appointment Card */}
        <div className="w-full max-w-4xl backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        <div className=" mx-2 my-5 flex justify-between mb-4 " >
          <BackButton className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition" />
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
            >
              Delete Appointment
            </button>
          </div>
        </div>
          {/* Cover + Patient */}
          <div className="relative h-48 sm:h-64 md:h-72">
            <img
              src={cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={doctor}
                alt={appointment?.name}
                className="w-42 h-42 rounded-full border-4  border-white shadow-xl"
              />
            </div>
          </div>

          {/* Top Section */}
          <div className="mt-20 text-center px-4 sm:px-8 pb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {appointment?.name?.toUpperCase() || "Patient Name"}
            </h2>
            <p className="text-gray-700 mt-2">
              {appointment?.gender || "Gender not specified"}
            </p>
            <p className="text-gray-700 mt-2">
              Appointment Code: {appointment?.appointmentCode || "N/A"}
            </p>
            <p className="text-gray-700 mt-2">
              Status:{" "}
              <span className="font-semibold">
                {appointment?.status || "N/A"}
              </span>
            </p>
          </div>

          {/* Appointment Details */}
          <div className="px-6 sm:px-8 pb-12 space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Contact Info
              </h3>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {appointment?.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {appointment?.phone || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {appointment?.dob || "N/A"}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Appointment Info
              </h3>
              <p>
                <span className="font-semibold">Department:</span>{" "}
                {appointment?.department || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Service:</span>{" "}
                {appointment?.service || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Doctor:</span>{" "}
                {appointment?.doctor || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {appointment?.date || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Additional Info:</span>{" "}
                {appointment?.additionalInfo || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentProfile;
